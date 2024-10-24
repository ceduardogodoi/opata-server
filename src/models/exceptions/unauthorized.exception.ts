import { StatusCodes } from "http-status-codes";
import { ProblemDetailException } from "./problem-detail.exception";

export class UnauthorizedException extends ProblemDetailException {
  constructor() {
    super(
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401",
      StatusCodes.UNAUTHORIZED,
      "Não autorizado.",
      "Não foi possível verificar a identidade."
    );
  }
}
