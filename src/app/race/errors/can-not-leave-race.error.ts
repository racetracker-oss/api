import { AppError } from "@/app/common";

export class CanNotLeaveRaceError extends AppError {
  constructor(public readonly message = "Can not leave the race.") {
    super(message, 400);
    this.name = "CanNotLeaveRace";
  }
}
