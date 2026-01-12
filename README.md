# 🚗 My Vehicle Management

A modern and robust vehicle management system built with a professional architecture and strict data validation. This project follows clean code principles, separating responsibilities to ensure maintainability and scalability.

## 🚀 Tech Stack

### Frontend
- **React.js**: Core library for the user interface.
- **Vercel**: High-performance hosting for the frontend application.

### Backend
- **Node.js & Express**: Runtime environment and framework for the REST API.
- **Zod**: Type-safe schema declaration and validation for incoming requests.
- **Render**: Cloud platform for hosting the backend service.

### Database
- **PostgreSQL**: Relational database for persistent and structured vehicle data storage.

---

## 🏗️ Project Architecture

The backend is organized into a layered architecture to decouple business logic from infrastructure:

* **Routes**: Defines the API endpoints and maps them to specific controllers.
* **Controllers**: Handles HTTP requests/responses and orchestrates the flow of data.
* **Services**: Contains the core business logic and direct interaction with the PostgreSQL database.
* **Schemas (Zod)**: Validation layer that ensures data integrity before it reaches the services.
