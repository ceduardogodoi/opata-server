import crypto from "node:crypto";
import {
  AuthFlowType,
  CodeMismatchException,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandOutput,
  ExpiredCodeException,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  InvalidPasswordException,
  NotAuthorizedException,
  SignUpCommand,
  SignUpCommandOutput,
  UsernameExistsException,
  UserNotConfirmedException,
} from "@aws-sdk/client-cognito-identity-provider";
import { getCognitoInstance } from "../libs/aws-cognito";
import { SignInParams } from "../validations/authentication/sign-in.validation";
import { env } from "../env";
import { ConfirmSignUpParams } from "../validations/authentication/confirm-sign-up.validation";
import { UsernameExistsDetailException } from "../models/exceptions/username-exists-detail.exception";
import { Result } from "../models/result";
import { UnknownException } from "../models/exceptions/unknown.exception";
import { InvalidPasswordDetailException } from "../models/exceptions/invalid-password-detail.exception";
import { CodeMismatchDetailException } from "../models/exceptions/code-mismatch-detail.exception";
import { ExpiredCodeDetailException } from "../models/exceptions/expired-code-detail.exception";
import { NotAuthorizedDetailException } from "../models/exceptions/not-authorized-detail.exception";
import { UserNotConfirmedDetailException } from "../models/exceptions/user-not-confirmed-detail.exception";

export class AuthenticationService {
  readonly #cognito: CognitoIdentityProviderClient;

  constructor() {
    this.#cognito = getCognitoInstance();
  }

  #generateSecretHash(username: string): string {
    return crypto
      .createHmac("SHA256", env.AWS_COGNITO_CLIENT_SECRET)
      .update(`${username}${env.AWS_COGNITO_CLIENT_ID}`)
      .digest("base64");
  }

  public async signUp(
    credentials: SignInParams
  ): Promise<Result<SignUpCommandOutput>> {
    try {
      const { email, password } = credentials;

      const command = new SignUpCommand({
        ClientId: env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        SecretHash: this.#generateSecretHash(email),
      });

      const response = await this.#cognito.send(command);
      return [null, response];
    } catch (error) {
      if (error instanceof UsernameExistsException) {
        return [new UsernameExistsDetailException(error), null];
      }

      if (error instanceof InvalidPasswordException) {
        return [new InvalidPasswordDetailException(error), null];
      }

      return [new UnknownException(), null];
    }
  }

  public async confirmSignUp(
    params: ConfirmSignUpParams
  ): Promise<Result<ConfirmSignUpCommandOutput>> {
    try {
      const { email, confirmationCode } = params;

      const command = new ConfirmSignUpCommand({
        ClientId: env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: confirmationCode,
        SecretHash: this.#generateSecretHash(email),
      });

      const response = await this.#cognito.send(command);
      return [null, response];
    } catch (error) {
      if (error instanceof CodeMismatchException) {
        return [new CodeMismatchDetailException(error), null];
      }

      if (error instanceof ExpiredCodeException) {
        return [new ExpiredCodeDetailException(error), null];
      }

      return [new UnknownException(), null];
    }
  }

  public async signIn(
    credentials: SignInParams
  ): Promise<Result<InitiateAuthCommandOutput>> {
    try {
      const { email, password } = credentials;

      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: this.#generateSecretHash(email),
        },
        ClientId: env.AWS_COGNITO_CLIENT_ID,
      });

      const response = await this.#cognito.send(command);
      return [null, response];
    } catch (error) {
      if (error instanceof NotAuthorizedException) {
        return [new NotAuthorizedDetailException(error), null];
      }

      if (error instanceof UserNotConfirmedException) {
        return [new UserNotConfirmedDetailException(error), null];
      }

      return [new UnknownException(), null];
    }
  }
}
