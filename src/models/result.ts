import { ProblemDetailException } from "./exceptions/problem-detail.exception";

export type Result<T> = [null, T] | [ProblemDetailException, null];
