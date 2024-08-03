Visit Stats Backend

 Overview

Visit Stats Backend is a Node.js REST API built with NestJS. It tracks website visits by country and provides endpoints for managing and analyzing visit data. The project uses Sequelize for ORM, Bull for job queues, and Redis for caching.

 Features

- NestJS: Modular framework for building scalable server-side applications.
- Sequelize: ORM for PostgreSQL database management.
- Bull: Job queue management using Redis.
- Redis: Caching to improve performance.
- Swagger: API documentation with a secure login.
- Docker: Containerization for easy deployment.

 Installation

# Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/) (optional, for Docker deployment)


1. Install Dependencies

   ```bash
   npm install
   ```

2. Configure Environment Variables

   Create a `local.env` file in the root directory and set your environment variables

3. Run Migrations

   ```bash
   npm run migration:up
   ```

 Usage

# Start the Application

- Development Mode

  ```bash
  npm run start:dev
  ```

- Production Mode

  ```bash
  npm run start:prod
  ```

# Swagger API Documentation

The API documentation is available via Swagger UI. To access it:

1. Start the application in development mode (`npm run start:dev`).
2. Open your browser and navigate to `http://localhost:6001/DOC`.

Login Credentials for Swagger UI:

- Username: `swagger`
- Password: `123456`

# Docker

To build and run the application using Docker:

```bash
npm run docker:run
```

# Testing

- Run Tests

  ```bash
  npm test
  ```

- Coverage Report

  ```bash
  npm run test:cov
  ```

 Scripts

- `build`: Compile the application.
- `format`: Format code using Prettier.
- `lint`: Lint code using ESLint.
- `test`: Run unit tests.
- `test:cov`: Generate a coverage report.
- `migrate`: Run database migrations.
- `docker:run`: Build and start Docker containers.

 Dependencies

- @nestjs/common, @nestjs/core: Core NestJS modules.
- @nestjs/sequelize: Sequelize integration for NestJS.
- bull: Job queue system with Redis.
- redis: Redis client for caching.
- sequelize: ORM for PostgreSQL.
- dotenv: Manage environment variables.
- @nestjs/swagger: Swagger integration for API documentation.
