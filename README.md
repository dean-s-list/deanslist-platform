# Deanslist Platform

## Getting Started

### Prerequisites

- Node v20 or higher
- PNPM
- Docker

> [!TIP]
> If you don't have PNPM installed, you can install it using `corepack`:
>
> ```sh
> corepack enable
> corepack prepare pnpm@latest --activate
> ```

### Installation

Clone the repo and install dependencies:

```shell
git clone git@github.com:pubkeyapp/deanslist-platform.git
cd deanslist-platform
pnpm install
```

### Automatic setup

You can run the automatic setup script to create the `.env` file, test the setup and push the database schema.

```shell
pnpm setup
```

### Environment variables

Copy the `.env.example` file to `.env` and fill in the missing values.

```shell
cp .env.example .env
```

Create a `JWT_SECRET` and a `SESSION_SECRET`, using the command below, and update them in `.env` file:

```shell
openssl rand -hex 32
```

Get your Solana wallet and update the `AUTH_SOLANA_ADMIN_IDS` in `.env` file.
Once you start the app, if you connect with the same wallet id you will have admin rights.

### Starting the services

You will need to start the database before starting the backend.

```shell
pnpm dev:services
```

### Pushing the database schema

If you start from scratch, you will need to push the database schema to the database.

```shell
pnpm prisma db push
```

Also, after each change to the schema in `prisma/schema.prisma`, you will need to run the above command again.

### Starting the API

```shell
pnpm dev:api
```

### Starting the web ui

```shell
pnpm dev:web
```

### Starting the SDK generator

```shell
pnpm dev:sdk
```

## Explaining the codebase

This codebase is a [Nx Monorepo](https://nx.dev/).

It includes:

1. 2 app projects: `api`, `web`
2. 2 e2e projects: `api-e2e`, `web-e2e`
3. 2 lib projects: `sdk`, `tools`

It is utilizing the below technologies for ease of development:

- Database: [PostgreSQL](https://www.postgresql.org/)
- Schema and database management: [Prisma](https://www.prisma.io/)
- E2E APIs: [GraphQL](https://graphql.org/)
- UI library: [Mantine](https://mantine.dev/)

The diagram below shows the dataflow E2E.

![Architecture](docs/Deanslist-Architecture.drawio.svg)

To get a detailed code structure run:

```shell
pnpm nx graph
```

### API code

The backend code is located under `./libs/api`.

- The `core` folder includes framework related and reusable functionality, e.g. app configuration, pagination, etc...
- Each app `<ENTITY>` has its own folder, `./libs/api/<ENTITY>`
  - the `data-access` folder has code to interact with the database
  - the `feature` folder has code to return data to the UI

### WEB code

The WEB code is located under `./libs/web`.

- The `core` folder includes framework related and reusable functionality, e.g. components, etc...
- Each app `<ENTITY>` has its own folder, `./libs/web/<ENTITY>`
  - the `data-access` folder has code to get data from the API
  - the `feature` folder sets up the routes and the pages
  - the `ui` folder holds simple UI elements to be used in the `feature` code

## Extending the application

You can use the following commands to generate new models, API features, web features and SDK types.

### Adding a new model

The following command will generate a new model in `prisma/schema.prisma`.

You will need to run `pnpm prisma db push` to push the schema to the database.

```shell
pnpm nx g prisma-model company
```

Output:

```shell
> NX Generating @deanslist-platform/tools:prisma-model

UPDATE prisma/schema.prisma
```

### Adding a new API feature

The following command will generate a new API feature in `libs/api/company/*`.

You will need to restart the API server to make sure it picks up the new libraries.

```shell
pnpm nx g api-feature company
```

Output:

```shell
> NX Generating @deanslist-platform/tools:api-feature

CREATE libs/api/company/data-access/...
CREATE libs/api/company/feature/...
UPDATE libs/api/core/feature/src/lib/api-core-feature.module.ts
CREATE libs/sdk/src/graphql/feature-company.graphql
CREATE apps/api-e2e/src/api/api-company-feature.spec.ts
```

### Adding a new web feature

The following command will generate a new web feature in `libs/web/company/*`.

You will need to restart the web server to make sure it picks up the new libraries.

```shell
pnpm nx g web-feature company
```

Output:

```shell
> NX Generating @deanslist-platform/tools:web-feature

CREATE libs/web/company/data-access/...
CREATE libs/web/company/feature/...
CREATE libs/web/company/ui/...
UPDATE libs/web/shell/feature/src/lib/shell-admin-routes.tsx
UPDATE tsconfig.base.json
```
