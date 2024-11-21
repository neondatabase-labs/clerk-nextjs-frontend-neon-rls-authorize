# Neon Authorize + Clerk RLS Example (SQL from the Frontend)

This repository is a guided getting started example for Neon Authorize + Clerk.
It consists of a todo list application, and the frontend is directly
sending SQL queries to the database. The database is enforcing authorization using
[Postgres RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

1. Create a Neon project ( [pg.new](https://pg.new/) )
2. Create a Clerk Application ( https://go.clerk.com/cHq4Ut6 ) 
3. Head to the Clerk dashboard, and find "JWT Templates"
4. Create a JWT Template ("Blank") and give it any name (e.g., "my-jwt-template")
5. Copy the "JWKS Endpoint" URL and save it for later
6. Head to the Neon Console, and find "Authorize"
7. Inside Authorize, click "Add Authentication Provider", and paste in the JWKS Endpoint URL you copied earlier
8. Follow the steps in the UI to setup the roles for Neon Authorize. You should ignore the schema related steps if you're following this guide.
9. Clone this repository and run `npm install` or `bun install`
10. Create a `.env` file in the root of this project and add the following:

```
# Grab from Clerk's dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Grab from Neon's dashboard (the "authenticated" role)
NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# This is needed for drizzle:migrate, grab from Neon's dashboard (database owner role)
DATABASE_URL=
```

11. Run `npm run drizzle:migrate` or `bun run drizzle:migrate` to apply the migrations
12. Run `npm run dev` or `bun run dev`
13. Open your browser and go to `http://localhost:3000`
14. Login and play around!
