import { StatusCodes } from "http-status-codes";
import { InvalidPasswordException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class InvalidPasswordDetailException extends ProblemDetailException {
  constructor(error: InvalidPasswordException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/InvalidPasswordException/",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Senha deve ter no mínimo 6 caracteres.",
      "A senha informada não satisfaz os requisitos mínimos."
    );
  }
}
