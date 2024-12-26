export class RaceNotFoundError extends Error {
  public readonly status: number = 404;
  constructor(public readonly message = "Race not found.") {
    super(message);
    this.name = "RaceNotFoundError";
  }
}
