import { StatusCodes } from "http-status-codes";
import { ProblemDetailException } from "./problem-detail.exception";

export class UnknownException extends ProblemDetailException {
  constructor() {
    super(
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Erro desconhecido.",
      "Ocorreu um erro desconhecido, tente novamente mais tarde."
  );
  }
}
