# Backend

This is the backend (MongoDB, Express, Node.js) stack project. It provides APIs for salary management, attendance tracking, and user authentication.

## Features

- **User Authentication**:
  - Sign up and log in with secure JWT-based authentication.
  - Middleware to verify user access.

- **Salary Management**:
  - Create salary records for employees.
  - Calculate net salary based on attendance and deductions.
  - Retrieve salary details by employee ID and filter by date.

- **Attendance Management**:
  - Mark attendance for employees.
  - Track attendance records for salary calculations.

## Routes

### User Authentication

- **Sign Up**: `POST /api/users/signup`
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123",
      "role": "HR"
    }
    ```
  - Response:
    ```json
    {
      "data": {
        "success": true,
        "message": "user created successfully!",
        "data": { ... }
      }
    }
    ```

- **Sign In**: `POST /api/users/signin`
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "data": {
        "success": true,
        "message": "login successfully!",
        "user": { "id": "user_id", "email": "john.doe@example.com", "token": "jwt_token", "role": "HR" }
      }
    }
    ```

- **Get User by ID**: `GET /api/users/:id`
  - Requires `HR` or `ADMIN` role.
  - Response:
    ```json
    {
      "data": { ... }
    }
    ```

- **Get All Users**: `GET /api/users/`
  - Requires `HR` or `ADMIN` role.
  - Response:
    ```json
    {
      "data": [ ... ]
    }
    ```

### Salary Management

- **Create Salary**: `POST /api/employees/salary/create`
  - Requires `HR` or `ADMIN` role.
  - Request Body:
    ```json
    {
      "employeeId": "employee_id",
      "basic": 20000,
      "hra": 5000,
      "allowance": 3000,
      "otherDeductions": 1000
    }
    ```
  - Response:
    ```json
    {
      "data": {
        "message": "salary created successfully",
        "salary": { ... }
      }
    }
    ```

- **Get Salary by ID**: `GET /api/employees/salary/:id`
  - Requires authentication.
  - Response:
    ```json
    {
      "data": { ... }
    }
    ```

- **Calculate Salary**: `POST /api/employees/salary/calculate`
  - Requires `HR` or `ADMIN` role.
  - Request Body:
    ```json
    {
      "employeeId": "employee_id",
      "month": "2025-04"
    }
    ```
  - Response:
    ```json
    {
      "gross": 28000,
      "tax": 2800,
      "pf": 2400,
      "fullDays": 20,
      "halfDays": 2,
      "netSalary": 22000
    }
    ```

### Attendance Management

- **Mark Attendance**: `POST /api/employees/attendance/mark`
  - Requires authentication.
  - Request Body:
    ```json
    {
      "hoursWorked": 8
    }
    ```
  - Response:
    ```json
    {
      "data": {
        "success": true,
        "message": "attendance marked successfully",
        "data": { ... }
      }
    }
    ```

## How to Start the Backend

1. Ensure MongoDB is running locally or provide a valid MongoDB connection string in the [.env](http://_vscodecontentref_/1) file.
2. Start the backend server:
   ```bash
   npm start
