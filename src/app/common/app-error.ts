export class AppError extends Error {
  public readonly status: number = 500;
  constructor(public readonly message: string, private _status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = _status;
  }
}
