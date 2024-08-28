import { StatusCodes } from "http-status-codes";
import { UserNotConfirmedException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class UserNotConfirmedDetailException extends ProblemDetailException {
  constructor(error: UserNotConfirmedException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/UserNotConfirmedException/",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Usuário ainda não confirmado.",
      "O usuário informado ainda não passou pelo processo de confirmação."
    );
  }
}
