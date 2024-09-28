import { neon } from "@neondatabase/serverless";

export function getDb(authToken: string) {
  // Yes, this is a public database URL. This is for the authenticated role. In
  // RLS we trust.
  return neon(
    "postgresql://authenticated@ep-proud-rice-w04660lh.cloud.nitrogen.aws.neon.build/neondb?sslmode=require",
    {
      authToken,
    },
  );
}
