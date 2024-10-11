# Neon Authorize + Clerk RLS Example (SQL from the Frontend)

This repository is a guided getting started example for Neon Authorize + Clerk.
It consists of a todo list application, and the frontend is directly
sending SQL queries to the database. The database is enforcing authorization using
[Postgres RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

1. Create a Neon project
2. Create a Clerk Application
3. Head to the Clerk dashboard, and find "JWT Templates"
4. Create a JWT Template ("Blank") and give it any name (e.g., "my-jwt-template")
5. Copy the "JWKS Endpoint" URL and save it for later
6. Head to the Neon Console, and find "Authorize"
7. Inside Authorize, click "Add Authentication Provider", and paste in the JWKS Endpoint URL you copied earlier
8. Clone this repository and run `npm install`
9. Create a `.env` file in the root of this project and add the following:

```
# Grab from Clerk's dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Grab from Neon's dashboard (the "authenticated" role)
NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

10. Run `npm run drizzle:migrate` or `bun run drizzle:migrate` to apply the migrations
11. Run `npm run dev` or `bun run dev`
12. Open your browser and go to `http://localhost:3000`
13. Login and play around!