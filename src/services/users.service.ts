import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  GetUserCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import { getCognitoInstance } from "../libs/aws-cognito";
import { Result } from "../models/result";
import { UnknownException } from "../models/exceptions/unknown.exception";

export class UsersService {
  readonly #cognito: CognitoIdentityProviderClient;

  constructor() {
    this.#cognito = getCognitoInstance();
  }

  public async getUser(
    accessToken: string
  ): Promise<Result<GetUserCommandOutput>> {
    try {
      const command = new GetUserCommand({
        AccessToken: accessToken,
      });

      const response = await this.#cognito.send(command);
      return [null, response];
    } catch (error) {
      return [new UnknownException(), null];
    }
  }
}
