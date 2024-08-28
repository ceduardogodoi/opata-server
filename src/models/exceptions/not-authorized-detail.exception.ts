import { StatusCodes } from "http-status-codes";
import { NotAuthorizedException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class NotAuthorizedDetailException extends ProblemDetailException {
  constructor(error: NotAuthorizedException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/NotAuthorizedException/",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Usuário ou senha incorretos.",
      "O usuário ou senha informados estão incorretos."
    );
  }
}
