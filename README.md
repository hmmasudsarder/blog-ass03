# 📲📲 Blog API - Assignment 3

This project is a RESTful API built with **TypeScript** **Express** to manage a Blog Website Api. It uses **MongoDB** with Mongoose for data storage and retrieval.

---

## ✨ Features

### CRUD Operations for Crete Blog:

- ➕ **Create new Blog**
- 📋 **Get a list of all Blogs and 🔍 filtering or search specific name keywords**
- ✏️ **Update a specific Blog by ID**
- ❌ **Delete a Blog for Owen blog**

## 🚀 Getting Started

This project requires **Node.js** and **npm** to be installed on your system. use localy

1. Clone this repository:

   ```bash
   git clone https://github.com/hmmasudsarder/blog-ass03.git
   ```

2. Navigate to the project directory:becareful

   ```bash
   cd blog-ass03
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:

   ```json
   PORT=5000
   DB_URI=<Your MongoDB Connection URI>
   R O kiso lakbey Setey Assignment porey add korbo for copy past regaion
   ```

### ▶️ Running the API

Start the development server:

```bash
npm run dev
```

This will start the server on port 5000 by default.

Check the server status at:
http://localhost:5000

### 🌐 Deployment

The Book Shop API is deployed and live on Vercel, making it accessible for testing and integration.

**Base URL:**  
🌍 [https://blog-three-teal-74.vercel.app/](https://blog-three-teal-74.vercel.app/)

Response:

```
{
    Hello Verson2.0 In Bangladesh!
}
```

### 📚 API Documentation

The API uses standard HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`) for CRUD operations. Below is the detailed documentation of the endpoints.

---

### ➕ Create a User

#### Authentication

- **Endpoint**: `/api/auth/register`
- **Method**:
  Register User

Description: Registers a new user with the platform. It validates user data and saves it to the database.

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:

```
Success (201):
{
"success": true,
"message": "User registered successfully",
"statusCode": 201,
"data": {
"_id": "string",
"name": "string",
"email": "string"
}
}
Failure (400):
{
"success": false,
"message": "Validation error",
"statusCode": 400,
"error": { "details" },
"stack": "error stack"
}
```

- **Endpoint**: `/api/auth/login`
- **Method**:
  Login User
  POST

Description: Authenticates a user with their email and password and generates a JWT token.

**Request Body**:

```

{
"email": "john@example.com",
"password": "securepassword"
}
```

**Response**:

- Success (200):

```
{
"success": true,
"message": "Login successful",
"statusCode": 200,
"data": {"token": "string"}

}
```

- Failure (401):

```
{
"success": false,
"message": "Invalid credentials",
"statusCode": 401,
"error": { "details" },
"stack": "error stack"
}
```

## 📲 crud Blog Oprations

### ➕ Create a Blog

- **Endpoint**: `/api/blogs`
- **Method**: `POST`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

### ✏️ Update a Blog

PATCH /api/blogs/:id

Description: Allows a logged-in user to update their own blog by its ID.

Request Header:Authorization: Bearer <token>

Request Body:

{
"title": "Updated Blog Title",
"content": "Updated content."
}
Response:

Success (200):
{
"success": true,
"message": "Blog updated successfully",
"statusCode": 200,
"data": {
"\_id": "string",
"title": "string",
"content": "string",
"author": { "details" }
}
}

### ❌ Delete a Blog

DELETE /api/blogs/:id

Description: Allows a logged-in user to delete their own blog by its ID.

Request Header:Authorization: Bearer <token>

- **Response:**

```json
Success (200):
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

### 📋 Get All Books

GET /api/blogs

Description: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

Query Parameters:

search: Search blogs by title or content (e.g., search=blogtitle).
sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).
sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).
filter: Filter blogs by author ID (e.g., filter=authorId).
Example Request URL:

- **Endpoint:** `/api/products`
- **Method:** `GET`

```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
In this example:
```

search=technology: Filters blogs containing the term "technology" in the title or content.
sortBy=createdAt: Sorts the blogs by the createdAt field.
sortOrder=desc: Sorts in descending order (newest blogs first).
filter=60b8f42f9c2a3c9b7cbd4f18: Filters blogs authored by the user with the given authorId.

**Response:**

```json
Success (200):
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

Error Handling
The API uses standard HTTP status codes to indicate success or failure. In case of errors, the response includes an error message and details about the issue.

🧑‍💻 Development

- Fork the repository and clone it locally.
- Follow the steps under Getting Started.
- Open a pull request for feature updates or bug fixes.
