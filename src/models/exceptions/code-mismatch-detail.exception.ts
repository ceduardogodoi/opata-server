import { StatusCodes } from "http-status-codes";
import { CodeMismatchException } from "@aws-sdk/client-cognito-identity-provider";
import { ProblemDetailException } from "./problem-detail.exception";

export class CodeMismatchDetailException extends ProblemDetailException {
  constructor(error: CodeMismatchException) {
    super(
      "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/CodeMismatchException/",
      error.$metadata.httpStatusCode ?? StatusCodes.BAD_REQUEST,
      "Código informado não confere.",
      "O código informado está incorreto. Verique o código novamente."
    );
  }
}
