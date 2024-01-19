type CaseResult<TReturn> = (() => TReturn) | TReturn;
type Case<TValue, TReturn> = { value: TValue; caseResult: CaseResult<TReturn> };
type RemoveNever<A, B> = A extends never ? B : A;

const isFunction = <TValue>(
  caseResult: (() => TValue) | TValue
): caseResult is () => TValue => typeof caseResult === "function";

class Switcher<TValue, TReturn = never, TDefault = undefined> {

  constructor(
    private value: TValue,
    private cases: Case<TValue, TReturn>[] = [],
    private defaultCase: (() => TDefault) | TDefault = undefined as TDefault
  ) {}

  case = <TReturnNew>(value: TValue, caseResult: CaseResult<TReturnNew>) =>
    new Switcher<
      TValue,
      RemoveNever<TReturn, TReturnNew> | TReturnNew,
      TDefault
    >(
      this.value,
      [
        ...(this.cases as Case<
          TValue,
          TReturnNew | RemoveNever<TReturn, TReturnNew>
        >[]),
        { value, caseResult },
      ],
      this.defaultCase
    );

  default = <TDefaultNew>(caseResult: CaseResult<TDefaultNew>) =>
    new Switcher<TValue, RemoveNever<TReturn, TReturn>, TDefaultNew>(
      this.value,
      this.cases as Case<TValue, RemoveNever<TReturn, TReturn>>[],
      caseResult
    );

  eval = () => {
    for (const caze of this.cases) {
      if (caze.value === this.value) {
        if (isFunction(caze.caseResult)) {
          return caze.caseResult();
        }
        return caze.caseResult as TReturn;
      }
    }
    return isFunction(this.defaultCase)
      ? this.defaultCase()
      : (this.defaultCase as TDefault);
  }
}

export const switchOn = <T>(value: T) => new Switcher(value);
