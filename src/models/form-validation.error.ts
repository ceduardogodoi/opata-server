import { StatusCodes } from 'http-status-codes'
import { ProblemDetailError } from './problem-detail.error'

type ZodFieldErrors = {
  [x: string]: string[] | undefined
  [x: number]: string[] | undefined
  [x: symbol]: string[] | undefined
}

export class FormValidationError extends ProblemDetailError {
  public extensions!: ZodFieldErrors

  constructor() {
    super(
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400',
      StatusCodes.BAD_REQUEST,
      'Campos inválidos: verifique os campos novamente.',
      'Um ou mais campos do formulário foram preenchidos de forma incorreta.'
    )
  }

  public setInstance(instance: string): this {
    this.instance = instance

    return this
  }

  public setExtensions(extensions: ZodFieldErrors): this {
    this.extensions = extensions

    return this
  }

  public build(): this {
    return this
  }
}
