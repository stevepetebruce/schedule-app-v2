import { AuthChecker } from "type-graphql";
import { Context } from "./context";

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  // If `@Authorized()`, check only is user exists
  if (roles.length === 0) {
    return context.uid !== null;
  }

  // there are some roles defined now

  if (!context.uid) {
    // and if no user, restrict access
    return false;
  }

  if (roles.includes("ADMIN")) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
}
