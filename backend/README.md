
# Grabbit – Backend

Backend foundation for the College Canteen Pre-Ordering System.

## Technology Stack

- Node.js – JavaScript runtime
- Express.js – Backend web framework
- CORS – Cross-Origin Resource Sharing
- dotenv – Environment variable management
- Nodemon – Automatic server restart during development

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── data/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── API_CONVENTIONS.md
├── README.md
├── package.json
└── package-lock.json
```

## Installation

Clone the repository and navigate to the backend folder.

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` as a reference.

## Running the Backend

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5001
```

## Health Check

Endpoint:

```text
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Grabbit backend is running!"
}
```

## Backend Architecture

- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle request processing and responses.
- **Middleware:** Handles shared request processing and checks.
- **Config:** Stores application configuration.
- **Data:** Holds temporary in-memory data when required.
- **Utils:** Contains reusable helper functions.

## Frontend Integration

The frontend is developed using React and Vite.

Frontend development URL:

```text
http://localhost:5173
```

Backend API base URL:

```text
http://localhost:5001/api
```

The frontend communicates with the backend through HTTP requests.

## Team Development

1. Install Node.js and npm.
2. Clone the project repository.
3. Navigate to the backend directory.
4. Run `npm install`.
5. Configure the `.env` file.
6. Run `npm run dev`.

Refer to `API_CONVENTIONS.md` for shared endpoint and response conventions.

---

**Project:** Grabbit – College Canteen Pre-Ordering System
