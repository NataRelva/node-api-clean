class PropsValidator<T> {
  private checks: ((input: T) => boolean | Promise<boolean>)[] = [];
  private error: Error;

  constructor() {}

  addCheck(
    check: (input: T) => boolean | Promise<boolean>,
    error: Error
  ): PropsValidator<T> {
    this.checks.push(check);
    if (!this.error) this.error = error;
    return this;
  }

  async validate(input: T): Promise<Error | null> {
    for (const check of this.checks) {
      const result = await check(input);
      if (!result) return this.error;
    }
    return null;
  }
}