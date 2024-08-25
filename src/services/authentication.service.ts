import crypto from "node:crypto";
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { getCognitoInstance } from "../libs/aws-cognito";
import { AuthenticationParams } from "../validations/authentication/sign-in.validation";
import { env } from "../env";
import { ConfirmSignUpParams } from "../validations/authentication/confirm-sign-up.validation";

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

  public async signUp(credentials: AuthenticationParams) {
    const { email, password } = credentials;

    const command = new SignUpCommand({
      ClientId: env.AWS_COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      SecretHash: this.#generateSecretHash(email),
    });

    const response = await this.#cognito.send(command);
    console.log(response);
  }

  public async confirmSignUp(params: ConfirmSignUpParams) {
    const { email, confirmationCode } = params;

    const command = new ConfirmSignUpCommand({
      ClientId: env.AWS_COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: confirmationCode,
      SecretHash: this.#generateSecretHash(email),
    });

    const response = await this.#cognito.send(command);
    console.log(response);
  }

  public async signIn(credentials: AuthenticationParams): Promise<void> {
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
    console.log(response);
  }
}
