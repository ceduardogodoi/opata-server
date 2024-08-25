import { StatusCodes } from "http-status-codes";

export abstract class ProblemDetailException {
  protected instance!: string;

  constructor(
    protected readonly type: string,
    public readonly status: StatusCodes,
    protected readonly title: string,
    protected readonly detail: string
  ) {}

  public setInstance(instance: string): this {
    this.instance = instance;

    return this;
  }

  public build(): this {
    return this;
  }
}
