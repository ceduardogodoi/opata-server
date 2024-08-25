import { StatusCodes } from "http-status-codes";
import { ProblemDetailException } from "./problem-detail.exception";

type ZodFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export class FormValidationException extends ProblemDetailException {
  public extensions!: ZodFieldErrors;

  constructor() {
    super(
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
      StatusCodes.BAD_REQUEST,
      "Campos inválidos: verifique os campos novamente.",
      "Um ou mais campos do formulário foram preenchidos de forma incorreta."
    );
  }

  public setExtensions(extensions: ZodFieldErrors): this {
    this.extensions = extensions;

    return this;
  }
}
