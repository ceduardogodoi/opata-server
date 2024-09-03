import { StatusCodes } from "http-status-codes";
import { NotAuthorizedException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class NotAuthorizedRevokedDetailException extends ProblemDetailException {
  constructor(error: NotAuthorizedException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/NotAuthorizedException/",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Token de Acesso inválido ou já revogado.",
      "O token de acesso é inválido ou já foi anteriormente revogado."
    );
  }
}
