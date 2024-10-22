import passport from "passport";
import { strategy } from "./auth.strategy";

export const auth = passport.authenticate(strategy, { session: false });
