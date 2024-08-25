import { StatusCodes } from "http-status-codes";
import { UsernameExistsException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class UsernameExistsDetailException extends ProblemDetailException {
  constructor(error: UsernameExistsException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/UsernameExistsException/",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Usuário já existente.",
      "Um usuário com este e-mail já foi criado anteriormente."
    );
  }
}
