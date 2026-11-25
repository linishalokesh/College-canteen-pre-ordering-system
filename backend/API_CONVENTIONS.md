
# Grabbit – API Conventions

This document establishes common API conventions for all backend contributors.

## 1. Base URL

```text
http://localhost:5001/api
```

All API endpoints should begin with `/api`.

## 2. HTTP Methods

| Method | Purpose |
|---|---|
| GET | Retrieve information |
| POST | Create new information |
| PUT | Update existing information |
| PATCH | Partially update information |
| DELETE | Remove information |

## 3. Endpoint Naming

- Use lowercase names.
- Use plural nouns for resource collections.
- Separate words using hyphens if required.
- Keep endpoint names consistent.

Proposed endpoint groups:

| Module | Endpoint prefix |
|---|---|
| Authentication | `/api/auth` |
| Food management | `/api/foods` |
| Categories | `/api/categories` |
| Orders | `/api/orders` |
| Admin | `/api/admin` |

These are proposed conventions, not implemented endpoints.

## 4. Standard Success Response

All successful responses should follow this structure:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

## 5. Standard Error Response

Errors should follow this structure:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

Use appropriate HTTP status codes, such as:

- `200` – Successful request
- `201` – Resource created
- `400` – Invalid request
- `401` – Authentication required
- `403` – Access forbidden
- `404` – Resource not found
- `500` – Internal server error

## 6. Request and Response Rules

- Use JSON for request bodies and JSON responses.
- Use meaningful field names.
- Validate incoming data.
- Return appropriate HTTP status codes.
- Keep response structures consistent across modules.

## 7. Backend Folder Responsibilities

- Routes define endpoints.
- Controllers contain request-handling logic.
- Middleware handles shared processing and checks.
- Data stores temporary in-memory information when applicable.
- Config stores configuration.
- Utils contains reusable helper functions.

## 8. Frontend–Backend Communication

The React frontend communicates with Express through HTTP requests.

Example:

```javascript
const response = await fetch(
  "http://localhost:5001/api/health"
);

const result = await response.json();

console.log(result);
```

The frontend should use the backend API rather than directly accessing backend data.

## 9. Team Coordination

Before implementing a new endpoint, contributors should agree on:

1. Endpoint URL.
2. HTTP method.
3. Required request fields.
4. Expected response format.
5. Appropriate status codes.

All contributors should follow these conventions to maintain consistency during integration.
