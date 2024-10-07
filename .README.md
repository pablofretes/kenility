# User Management API

This README provides information about the protected routes in our User Management API and how to obtain and use a JWT token for authentication.

## Protected Routes

The following routes are protected with JWT token authentication:

- `POST /users` (Create User)
- `GET /users` (Get All Users)
- `PUT /users/:id` (Update User)

To access these routes, you need to include a valid JWT token in the Authorization header of your requests.

## Running the Application

To run the application, use this command:

```
docker compose up --build
```

WAIT UNTIL THE SEED SCRIPT RUNS AND GENERATES THE ADMIN USER TO BE ABLE TO LOGIN

## How to Obtain a JWT Token

1. Use the login endpoint to authenticate and receive a JWT token:

   ```
   POST /users/login
   ```

   Request body:

   ```json
   {
     "name": "admin",
     "password": "admin"
   }
   ```

2. If the credentials are valid, the server will respond with a JWT token.

3. For subsequent requests to protected routes, include the token in the Authorization header:

   ```
   Authorization: Bearer <your-jwt-token>
   ```
