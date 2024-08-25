import crypto from "node:crypto";
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { getCognitoInstance } from "../libs/aws-cognito";
import { AuthenticationParams } from "../validations/authentication/sign-in.validation";
import { env } from "../env";

export class AuthenticationService {
  readonly #cognito: CognitoIdentityProviderClient;

  constructor() {
    this.#cognito = getCognitoInstance();
  }

  public async signIn(credentials: AuthenticationParams): Promise<void> {
    const { email, password } = credentials;

    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.#hashSecret(email),
      },
      ClientId: env.AWS_COGNITO_CLIENT_ID,
    });

    const response = await this.#cognito.send(command);
    console.log(response);
  }

  #hashSecret(username: string): string {
    return crypto
      .createHmac("SHA256", env.AWS_COGNITO_CLIENT_SECRET)
      .update(`${username}${env.AWS_COGNITO_CLIENT_ID}`)
      .digest("base64");
  }
}
