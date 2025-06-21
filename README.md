# Bug Bounty System

This project implements a simple bug bounty backend with Express and MySQL. It exposes RESTful APIs for managing users, vulnerabilities and reports while awarding reputation points and badges.

## Architecture

```
config/         - database configuration
controllers/    - route logic
models/         - DB access helpers
routes/         - express routers
middleware/     - validation and error handlers
migrations/     - SQL schema
scripts/        - helper scripts
```

The application uses a small layer of model functions around `mysql2/promise` for direct SQL queries. Controllers handle business rules and call models. Routes apply validation middleware before reaching controllers. Errors are caught by a centralized handler.

## Dependency Management

Dependencies are listed in `package.json`. Core packages include Express for the web framework, `mysql2` for database access and `dotenv` for configuration. `nodemon` is included as a dev dependency for auto reload during development.

## Database Design

Tables:
- `User` – stores username and reputation.
- `Vulnerability` – bug types with points.
- `Report` – links users to vulnerabilities and tracks status.
- `Badge` – gamification badges unlocked by minimum reputation.
- `UserBadge` – junction table for awarded badges.

See `migrations/schema.sql` for full DDL and `diagrams/erd.puml` for the ERD.

## API Design

### Users
- `POST /users` – create user.
- `GET /users` – list users.
- `GET /users/:id` – retrieve by id.
- `PUT /users/:id` – update username and reputation.

### Vulnerabilities
- `POST /vulnerabilities` – create vulnerability.
- `GET /vulnerabilities` – list vulnerabilities.

### Reports
- `POST /reports` – create a report and add vulnerability points to the reporting user.
- `PUT /reports/:report_id` – update report status; if closed, award points to closer and overwrite `user_id`.

Badges are automatically awarded when a user's reputation meets badge thresholds.

All endpoints return JSON and proper status codes. Validation middleware checks for required fields and the error handler returns uniform error responses.

### Using the API

All requests should include a `Content-Type: application/json` header and JSON bodies as shown below.

#### POST `/users`
Create a new user.

**Body**
```json
{
  "username": "pentester123"
}
```

**Success Response** `201 Created`
```json
{
  "id": 1,
  "username": "pentester123",
  "reputation": 0
}
```

#### GET `/users`
List all users. No body required.

#### GET `/users/:id`
Retrieve a specific user by `id`. No body required.

#### PUT `/users/:id`
Update an existing user.

**Body**
```json
{
  "username": "turnWhiteHat",
  "reputation": 100
}
```

#### POST `/vulnerabilities`
Create a vulnerability entry.

**Body**
```json
{
  "type": "XSS",
  "description": "The search bar is vulnerable to Cross-Site Scripting.",
  "points": 75
}
```

#### GET `/vulnerabilities`
List all vulnerabilities. No body required.

#### POST `/reports`
File a report linking a user to a vulnerability.

**Body**
```json
{
  "user_id": 2,
  "vulnerability_id": 5
}
```

The response includes the new report ID and the updated user reputation.

#### PUT `/reports/:report_id`
Update a report's status and optionally credit another user for closing it.

**Body**
```json
{
  "status": 1,
  "user_id": 7
}
```

If `status` is set to `1`, the points for the vulnerability are added to the specified `user_id` and returned in `user_reputation`.

## Setup

1. Copy `.env.example` to `.env` and provide database credentials.
2. Run `npm install` to install dependencies.
3. Initialize the database:
   ```bash
   npm run migrate
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Postman Testing Instructions

Use Postman to call each endpoint. Capture screenshots showing the request URL & method, request body (if any) and response body. Include one screenshot demonstrating error handling (e.g. create user with existing username).

## SQL Queries Highlights

Model files contain the SQL used. Inserts return new IDs while selects fetch details for controllers. Updates modify user reputation appropriately.

## Functionality Checklist

- [x] Users can be created, listed, retrieved and updated.
- [x] Vulnerabilities can be created and listed.
- [x] Reports grant points and can be closed.
- [x] Reputation updates unlock badges.

## Code Quality Notes

The project separates concerns via models, controllers and routes for modularity. Middleware centralizes validation and error responses. All code follows a consistent style with async/await for readability and includes basic comments.

## Version Control Guidelines

Suggested commit messages:
- `feat: add user model and controller`
- `feat: implement vulnerability endpoints`
- `feat: report logic with reputation update`
- `chore: add migration script`
- `docs: update README with usage`

Commit at least weekly or when completing a feature to keep history clear.

## Zip Packaging

Run `scripts/zip.sh` to create `bugbounty.zip` excluding the `node_modules` directory.
