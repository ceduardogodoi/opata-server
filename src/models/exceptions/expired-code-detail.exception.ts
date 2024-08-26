import { StatusCodes } from "http-status-codes";
import { ExpiredCodeException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class ExpiredCodeDetailException extends ProblemDetailException {
  constructor(error: ExpiredCodeException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/ExpiredCodeException",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Código ou email inválido.",
      "O código ou email não são válido ou já expiraram. Peça por um novo código."
    );
  }
}
