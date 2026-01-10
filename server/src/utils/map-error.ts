import { DrizzleQueryError } from "drizzle-orm";

export const isUniqueConstraintError = (error: unknown): boolean => {
  if (!(error instanceof DrizzleQueryError)) {
    return false;
  }

  const cause = error.cause as any;
  return cause?.code == "23505";
};