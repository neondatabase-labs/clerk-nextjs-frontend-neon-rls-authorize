<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon RLS Authorize + Clerk RLS Example (SQL from the Frontend)

A quick start Next.js template demonstrating secure user authentication and authorization using Neon RLS Authorize with Clerk integration. This guide primarily uses SQL from the frontend to enforce row-level security policies.

## Features

- Next.js application with TypeScript
- User authentication powered by Clerk
- Row-level security using Neon RLS Authorize
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Vercel, Netlify, and Render

## Prerequisites

- Create a Neon project ( [pg.new](https://pg.new) )
- Create a Clerk Application ( [https://go.clerk.com/cHq4Ut6](https://go.clerk.com/cHq4Ut6) )
- Node.js 18+ installed locally

## One-Click Deploy

Deploy directly to your preferred hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/clerk-nextjs-frontend-neon-rls-authorize&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,DATABASE_URL,NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL,NEXT_PUBLIC_CLERK_SIGN_IN_URL,NEXT_PUBLIC_CLERK_SIGN_UP_URL&project-name=clerk-neon-rls-authorize&repository-name=clerk-neon-rls-authorize)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/clerk-nextjs-frontend-neon-rls-authorize)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/neondatabase-labs/clerk-nextjs-frontend-neon-rls-authorize)

## Local Development Setup

### 1. Configure Clerk

1. Navigate to your Clerk dashboard and create a new application.
2. Obtain your **Publishable key** and **Secret key** from the Clerk dashboard.
    ![Clerk API Keys](/images/clerk-api-keys.png)
3. In your Clerk dashboard, go to **JWT Templates**.
    ![Clerk JWT Templates](/images/clerk-jwt-templates.png)
4. Create a new JWT Template (select "Blank" as the template type).
    ![Clerk JWT New Template Select](/images/clerk-jwt-new-template-select.png)
5. Name your template (e.g., `neon_rls_authorize`).
6. Copy the **JWKS Endpoint** URL. You'll need this for Neon RLS Authorize.
    ![Clerk JWT New Template created](/images/clerk-jwt-new-template-created.png)

### 2. Set Up Neon RLS Authorize

1. Open your Neon Console and click on **RLS Authorize** in your project's settings.
2. Click **Add Authentication Provider**.
3. Paste the **JWKS Endpoint** URL you copied from Clerk into the **JWKS URL** field.
4. Follow the steps in the Neon UI to set up the `authenticated` role. You can skip the schema-related steps if you are just getting started with this example.

    ![Neon RLS Authorize Add Auth Provider](/images/neon-authorize-add-auth-provider.png)

### 3. Local Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/neondatabase-labs/clerk-nextjs-frontend-neon-rls-authorize
    cd clerk-nextjs-neon-rls-authorize
    ```

2. Install dependencies:

    ```bash
    npm install  # or bun install
    ```

3. Create a `.env` file in the root of the project and fill the following environment variables:

    ```bash
    cp .env.template .env
    ```

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY

    # For the `neondb_owner` role.
    DATABASE_URL="YOUR_NEON_OWNER_CONNECTION_STRING"
    # For the `authenticated`, passwordless role.
    NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL="YOUR_NEON_AUTHENTICATED_CONNECTION_STRING"

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    ```

    > **Note:** Replace the placeholder values with your actual Neon and Clerk credentials.

4. Run the database migrations:

    ```bash
    npm run drizzle:generate  # or bun run drizzle:generate
    npm run drizzle:migrate  # or bun run drizzle:migrate
    ```

5. Start the development server:

    ```bash
    npm run dev  # or bun run dev
    ```

6. Visit `http://localhost:3000` to see the application running
    ![Clerk Next.js example app](/images/clerk-nextjs-example-app.png)

## Important: Production Setup

Before deploying to production:

1. Modify your Clerk application environment to use the Production instance. Create one if you haven't already.
    ![Clerk Production Environment](/images/clerk-production-environment.png)
2. Update your environment variables with the new production credentials
3. Update your authentication configuration in Neon RLS Authorize with the new JWKS URL


## Learn More

- [Neon RLS Authorize Tutorial](https://neon.tech/docs/guides/neon-authorize-tutorial)
- [Simplify RLS with Drizzle](https://neon.tech/docs/guides/neon-authorize-drizzle)
- [Clerk Documentation](https://clerk.com/docs)
- [Postgres RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Neon RLS Authorize + Clerk Integration](https://neon.tech/docs/guides/neon-authorize-clerk)

## Authors

- [David Gomes](https://github.com/davidgomes)
- [Pedro Figueiredo](https://github.com/pffigueiredo)
- [Bryan Clark](https://github.com/clarkbw)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
