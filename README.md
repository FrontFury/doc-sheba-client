# 🏥 DocSheba – Hospital Management System

**DocSheba** is a modern hospital management and appointment booking platform designed to simplify communication between patients, doctors, assistants, and administrators. It streamlines appointment scheduling, patient management, doctor availability, and hospital operations through a centralized system.

## ✨ Key Features

### 👤 Patient
- Register and log in to the platform.
- Manage personal profile information.
- Request appointments with doctors.
- View appointment details and status.
- Access personal appointment history.

### 🩺 Doctor
- Manage doctor profiles and professional information.
- View assigned appointments.
- Manage availability and schedules.
- Monitor patient appointment requests.

### 👩‍💼 Assistant
- Manage patient information.
- Assist new patients with profile registration.
- Review and process appointment requests.
- Confirm appointments based on doctors' available slots.
- Cancel appointments when necessary.
- Communicate appointment updates to patients.

### 🛡️ Admin
- Manage users and system roles.
- Manage doctors, assistants, and departments.
- Monitor appointments and hospital activities.
- Manage schedules and system information.
- Maintain centralized platform operations.

## 🚀 Core Functionalities

- Role-based authentication and authorization.
- Patient registration and profile management.
- Doctor and department management.
- Appointment request and confirmation system.
- Doctor availability and schedule management.
- Appointment cancellation.
- Centralized user management.
- MongoDB database integration.
- RESTful API architecture.

## 🛠️ Technologies Used

### Backend
- **Node.js** – JavaScript runtime environment.
- **Express.js** – Backend web framework.
- **MongoDB** – NoSQL database.
- **Firebase Admin SDK** – Authentication and user verification.
- **Nodemailer** – Email communication.
- **CORS** – Cross-origin resource sharing.
- **Dotenv** – Environment variable management.

### Development Tools
- Visual Studio Code
- Postman
- Git & GitHub
- MongoDB Atlas

## 📁 Project Structure

```text
DocSheba-Server/
│
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
└── README.md
```

## 🗄️ Database Collections

DocSheba uses MongoDB to manage the following collections:

| Collection | Purpose |
|---|---|
| `user` | User accounts and basic profile information |
| `patients` | Patient information |
| `doctors` | Doctor information |
| `assistants` | Assistant information |
| `departments` | Hospital departments |
| `appointments` | Appointment requests and records |
| `schedules` | Doctor availability and schedules |
| `medicalRecords` | Patient medical records |
| `prescriptions` | Doctor prescriptions |
| `notifications` | System notifications |

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd DocSheba-Server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```

Add any additional Firebase Admin or email configuration required by your implementation.

### 5. Run the Development Server

```bash
npm run dev
```

Or run with Node.js:

```bash
node index.js
```

## 🌐 API Base URL

Local development:

```text
http://localhost:5000
```

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server status |
| POST | `/user` | Register a new user |
| GET | `/user` | Retrieve users |
| POST | `/appointments` | Create an appointment |
| GET | `/appointments` | Retrieve appointments |

*Additional endpoints may be available depending on the backend implementation.*

## 🔄 Appointment Workflow

1. A patient requests an appointment with a doctor.
2. The system retrieves existing patient information.
3. New patients can complete their profile with assistance.
4. The assistant reviews the appointment request.
5. Doctor availability is checked.
6. The assistant confirms the appointment.
7. The patient receives appointment information.
8. The assistant can cancel an appointment when necessary.

## 🔒 Security & Configuration

- Store sensitive credentials in environment variables.
- Never commit `.env` files or Firebase service account credentials.
- Use authentication and role-based authorization.
- Validate incoming API requests.
- Handle errors securely.
- Protect sensitive patient information.

## 🚀 Deployment

The backend can be deployed using platforms such as:

- Vercel
- Render
- Railway

Ensure that MongoDB and all required environment variables are configured before deployment.

## 🎯 Project Objective

The primary goal of DocSheba is to make hospital appointment management more organized, accessible, and efficient by connecting patients, doctors, assistants, and administrators through a unified digital platform.

## 👨‍💻 Developer

**Developed by:** Estiak Ahamed Tasin

**Project:** DocSheba – Hospital Management System

---

⭐ If you find this project interesting, consider giving the repository a star!
