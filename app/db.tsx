import { neon } from "@neondatabase/serverless";

export function getDb(authToken: string) {
  const DATABASE_AUTHENTICATED_URL =
    process.env.NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL;

  if (!DATABASE_AUTHENTICATED_URL) {
    throw new Error("DATABASE_AUTHENTICATED_URL is not set");
  }

  // Yes, this is a public database URL. This is for the authenticated role. In
  // RLS we trust.
  return neon(DATABASE_AUTHENTICATED_URL, {
    authToken,
  });
}
