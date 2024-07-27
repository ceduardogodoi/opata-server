import { StatusCodes } from 'http-status-codes'

export abstract class ProblemDetailError {
  protected instance!: string

  constructor(
    protected readonly type: string,
    protected readonly status: StatusCodes,
    protected readonly title: string,
    protected readonly detail: string,
  ) {}
}
