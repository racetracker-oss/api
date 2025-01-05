import { AppError } from "@/app/common";

export class CanNotJoinRaceError extends AppError {
  constructor(public readonly message = "Can not join to race.") {
    super(message, 400);
    this.name = "CanNotJoinRaceError";
  }
}
