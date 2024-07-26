import { getReasonPhrase, StatusCodes } from 'http-status-codes'

type ProblemDetail = {
  type?: string
  status?: StatusCodes
  title?: string
  detail?: string
  instance: string
}

export class ProblemDetailError {
  public readonly type: string
  public readonly status: StatusCodes
  public readonly title: string
  public readonly detail: string
  public readonly instance: string

  constructor(data: ProblemDetail) {
    this.type =
      data.type ??
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500'
    this.status = data.status ?? StatusCodes.INTERNAL_SERVER_ERROR
    this.title =
      data.title ?? getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    this.detail =
      data.detail ??
      'The server encountered an unexpected condition that prevented it from fulfilling the request.'
    this.instance = data.instance
  }
}
