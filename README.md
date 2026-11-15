# Todo App — Spring Boot + Angular

A full-stack task management application built with a Java/Spring Boot REST API, Angular frontend and MySQL persistence.

## Features
- Create, list, update and delete tasks
- Track completion status
- Assign a priority (see `Priority` enum)
- Validate required task titles on API requests

## Tech stack
- **Backend:** Java 17, Spring Boot, Spring Web, Spring Data JPA, Jakarta Validation, Lombok, Maven
- **Frontend:** Angular 20, TypeScript, Angular Material
- **Database:** MySQL
- **Tests:** JUnit 5 / Mockito (backend); Jasmine/Karma (frontend)

## Project layout
```
backend/   Spring Boot REST API
frontend/  Angular client
```

## Local setup
1. Install Java 17, Maven, Node.js/npm and MySQL.
2. Create a MySQL database named `todoapp`.
3. Configure the connection in `backend/src/main/resources/application.properties`. The current development configuration uses `localhost:3307`, user `root`, and an empty password; change these settings for your environment and never use them in production.
4. In `backend/`, run `mvn spring-boot:run` (API defaults to `http://localhost:8080`).
5. In `frontend/`, run `npm install` then `npm start` (Angular defaults to `http://localhost:4200`).

## REST API
Base URL: `http://localhost:8080/api/todos`

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/todos` | List all tasks |
| POST | `/api/todos` | Create a task |
| PUT | `/api/todos/{id}` | Update a task |
| DELETE | `/api/todos/{id}` | Delete a task |

Example POST request:
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare internship application","completed":false,"priority":"MEDIUM"}'
```

## Tests
Run backend tests from `backend/`:
```bash
mvn test
```
Run frontend tests from `frontend/`:
```bash
npm test
```
The backend includes unit tests for task service behavior. Frontend specs include generated component/service smoke tests; further behavioral coverage is a future improvement.

> Test commands are documented here; successful execution has not yet been verified in CI.

## Notes
This is an educational project, not a production-ready service. In particular, database credentials and allowed CORS origins should be externalized and security reviewed before deployment.
