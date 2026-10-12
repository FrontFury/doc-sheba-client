# DocSheba ðŸ¥

**A Modern Hospital Management System**

DocSheba is a hospital management system designed to help patients, doctors, assistants, and administrators manage healthcare services through a centralized platform.

> **Project status:** In development. Features and API endpoints may change as development continues.

## Overview

DocSheba aims to simplify hospital operations by bringing appointment requests, doctor schedules, patient profiles, and administrative workflows into one system.

Patients can register and maintain their profiles, request appointments, and receive updates. Assistants can review appointment requests and coordinate bookings according to doctor availability. Doctors can access relevant schedules and patient information according to their permissions. Administrators can manage users and hospital information.

## Goals

- Make appointment booking easier for patients.
- Help assistants coordinate appointments based on doctor availability.
- Keep patient and doctor information organized.
- Provide role-based access to relevant features.
- Support a maintainable and scalable backend.

## User Roles

| Role | Responsibilities |
|---|---|
| **Patient** | Register, manage a profile, request appointments, and view appointment updates. |
| **Assistant** | Review appointment requests, coordinate available slots, confirm appointments, and handle cancellations according to permissions. |
| **Doctor** | View assigned appointments and relevant patient information; manage schedules where permitted. |
| **Admin** | Manage users, doctors, assistants, departments, and system settings. |

Role-specific features require authentication and server-side authorization before they should be used in production.

## Planned Features

- Patient registration and profile management
- Doctor and department directories
- Appointment requests and status updates
- Doctor schedules and availability management
- Assistant-assisted appointment confirmation and cancellation
- Medical records and prescriptions with restricted access
- Notifications for appointment updates
- Administrative user management
- Role-based dashboards

Features should be considered **planned** until they are implemented and tested in the application.

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB Native Node.js Driver
- dotenv
- cors

### Planned / integration-ready technologies

- Firebase Authentication for identity verification
- Nodemailer for email notifications

### Frontend

The frontend framework and exact dependencies depend on the current frontend implementation. Configure the frontend API base URL to point to the running backend.

## Project Structure

A possible backend structure for the current single-file setup:


As the project grows, routes, middleware, and database logic can be moved into separate folders.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (an active LTS version is recommended)
- npm (included with Node.js)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the repository

Replace the placeholder URL with your actual repository URL:

```bash
git clone https://github.com/YOUR_USERNAME/DocSheba.git
cd DocSheba
```

If you already have the project locally, open its backend directory instead.

### 2. Install dependencies

```bash
npm install
```

If the dependencies have not yet been added to `package.json`, install them with:

```bash
npm install express cors dotenv mongodb
npm install --save-dev nodemon
```

### 3. Configure environment variables

Create a `.env` file in the backend root. See [Environment Variables](#environment-variables).

### 4. Start the server

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The server should be available at `http://localhost:5000`.

The first successful startup connects to MongoDB and creates the configured collections if they do not already exist.

## Environment Variables

Example `.env` file:

```env
PORT=5000
DB_NAME=doc_sheba_db
MONGO_DB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/
CLIENT_URL=http://localhost:5173
```

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the Express server. Defaults to `5000`. |
| `DB_NAME` | MongoDB database name. Defaults to `doc_sheba_db`. |
| `MONGO_DB_URI` | MongoDB connection URI. |
| `CLIENT_URL` | Allowed frontend origin for CORS in the example server. |

Use your actual MongoDB connection string and credentials. URL-encode special characters in the database username or password when necessary.

**Never commit `.env` or database credentials to Git.**

## Run the Server

Example `package.json` scripts:

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

The `"type": "module"` setting enables the `import` syntax used by the server.

### Check the server

**Request**

```http
GET /
```

**Response**

```text
DocSheba Server Running!
```

Test endpoint:

```http
GET /api/test
```

Example response:

```json
{
  "success": true,
  "message": "DocSheba API is working!"
}
```

## API Documentation

The following endpoints describe the current example user CRUD API.

### User endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/user` | Create a user |
| `GET` | `/user` | Retrieve up to 100 users |
| `GET` | `/user/:id` | Retrieve a user by MongoDB ObjectId |
| `PATCH` | `/user/:id` | Update a user's name, email, or phone |
| `DELETE` | `/user/:id` | Delete a user by MongoDB ObjectId |

### Create a user

```http
POST /user
Content-Type: application/json
```

Request body:

```json
{
  "name": "Rahim Ahmed",
  "email": "rahim@example.com",
  "phone": "01712345678"
}
```

The example API normalizes email addresses to lowercase, assigns the `patient` role by default, and records creation/update timestamps. A unique database index prevents duplicate email addresses.

### Get all users

```http
GET /user
```

Returns users sorted by creation date, newest first, with a maximum of 100 results.

### Get one user

```http
GET /user/MONGODB_OBJECT_ID
```

Replace `MONGODB_OBJECT_ID` with the `_id` returned by MongoDB.

### Update a user

```http
PATCH /user/MONGODB_OBJECT_ID
Content-Type: application/json
```

Request body:

```json
{
  "name": "Rahim Ahmed",
  "phone": "01812345678"
}
```

The example endpoint allows updates to `name`, `email`, and `phone`. It does not allow a user to change their own role through this endpoint.

### Delete a user

```http
DELETE /user/MONGODB_OBJECT_ID
```

Deletion is permanent in the current example. Add appropriate authorization and any required retention or audit rules before using deletion with real records.

### Common response status codes

| Status | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Resource created |
| `400` | Invalid input or ID |
| `404` | Resource or route not found |
| `409` | Duplicate email |
| `500` | Unexpected server error |

## User CRUD Examples

You can test the API with [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/).

1. Start the backend.
2. Send `POST http://localhost:5000/user` with the create-user JSON body.
3. Copy the `_id` from the response.
4. Use `GET http://localhost:5000/user` to list users.
5. Use `GET http://localhost:5000/user/<id>` to fetch one user.
6. Use `PATCH http://localhost:5000/user/<id>` to update allowed fields.
7. Use `DELETE http://localhost:5000/user/<id>` to delete the user.

## Database Collections

The current initialization code prepares these collections in `doc_sheba_db`:

| Collection | Intended use |
|---|---|
| `user` | Basic user accounts and role information |
| `patients` | Patient-specific details |
| `doctors` | Doctor profiles and professional details |
| `assistants` | Assistant profiles |
| `departments` | Hospital departments |
| `appointments` | Appointment requests and booking information |
| `schedules` | Doctor availability and schedules |
| `medicalRecords` | Patient medical records |
| `prescriptions` | Prescriptions |
| `notifications` | User notifications |

Creating a collection does not automatically implement its CRUD operations, validation, indexes, or access permissions.

## Security Notes

DocSheba may handle sensitive healthcare information. Before production deployment:

- Add authentication and verify tokens on the server.
- Implement role-based authorization for every protected endpoint.
- Ensure patients can only access their own records.
- Restrict medical records and prescriptions to explicitly authorized roles.
- Protect admin-only role assignment and management endpoints.
- Validate and sanitize all request data.
- Never store plaintext passwords; use a trusted identity provider or a suitable password-hashing implementation.
- Keep secrets in environment variables or a secrets manager.
- Configure CORS for trusted frontend origins only.
- Add rate limiting, security headers, logging, and appropriate error handling.
- Use HTTPS in production.
- Follow applicable privacy, healthcare, and data-retention requirements.

**Important:** The example CRUD endpoints are not authenticated by themselves. Do not expose them publicly with real patient or production user data until authentication and authorization are implemented and tested.

## Future Improvements

- Firebase Authentication and verified-token middleware
- Protected role-specific dashboards
- Admin-only user and role management
- Doctor availability and appointment conflict checks
- Appointment confirmation and cancellation workflows
- Email or in-app notifications
- Pagination, filtering, and search
- Automated tests and API documentation
- Production deployment and monitoring

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request with a clear description.

## License

No license has been specified yet. Add a `LICENSE` file before distributing or reusing the project publicly.
