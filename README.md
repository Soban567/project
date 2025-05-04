# Task Management Application Backend

## Description
This is the backend for the Task Management Application. It is built with Node.js, Express.js, and MongoDB using Mongoose.

## Prerequisites
- Node.js and npm installed
- MongoDB instance running (local or cloud)
- Create a `.env` file in the root directory with the following content:
  ```
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  ```

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Run the following command to install dependencies:
   ```
   npm install
   ```

## Running the Server
Start the backend server with:
```
npm start
```

The server will run on the port specified in the `.env` file (default 5000).

## API Endpoints
- `POST /tasks` - Add a new task
- `GET /tasks` - Fetch all tasks
- `GET /tasks/:id` - Fetch a single task by ID
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Validation and Error Handling
- Incoming data is validated using `express-validator`.
- Errors are returned with appropriate HTTP status codes and messages.

## Notes
- Ensure MongoDB is running and accessible via the connection string in `.env`.
- Use tools like Postman or curl to test the API endpoints.
