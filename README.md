# PostApp Basic Backend

A RESTful API backend for a social media post application built with Node.js, Express, and MongoDB.  This application provides user authentication, post management, and social features like likes and comments.

## Features

### User Management
- **User Registration** - Create new user accounts with secure password hashing
- **User Login** - JWT-based authentication
- **User Profile** - View and update user profiles
- **Secure Authentication** - Password encryption using bcryptjs

### Post Management
- **Create Posts** - Authenticated users can create posts with title, content, tags, and visibility settings
- **View Posts** - Get all posts or retrieve specific posts by ID
- **Update Posts** - Edit your own posts (author verification)
- **Delete Posts** - Remove posts (author verification)
- **Like Posts** - Like/unlike posts
- **Comment on Posts** - Add comments to posts

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5. 2.1
- **Database**: MongoDB (via Mongoose v9.0.2)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Password Encryption**: bcryptjs v3.0.3
- **Environment Variables**: dotenv v17.2.3
- **Development**:  nodemon v3.1.11

## Project Structure

```
postApp-basic-backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── postControllers.js   # Post-related business logic
│   └── userControllers.js   # User-related business logic
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
├── models/
│   ├── Post.js              # Post schema
│   └── User.js              # User schema
├── routes/
│   ├── posts.js             # Post route definitions
│   └── users. js             # User route definitions
├── . gitignore
├── package.json
├── package-lock.json
└── server.js                # Application entry point
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ghost-28-02/postApp-basic-backend.git
   cd postApp-basic-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode: 
   ```bash
   npm start
   ```

## API Endpoints

### User Routes (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login user | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |

### Post Routes (`/api/v1/posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create a new post | Yes |
| GET | `/` | Get all posts | No |
| GET | `/:id` | Get post by ID | No |
| PUT | `/:id` | Update post | Yes |
| DELETE | `/:id` | Delete post | Yes |
| PUT | `/:postId/like` | Like/unlike a post | Yes |
| PUT | `/:id/comment` | Comment on a post | Yes |

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.  Protected routes require a valid JWT token in the request headers: 

```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for 7 days and are returned upon successful registration or login.

## Example Requests

### Register a User
```bash
POST /api/v1/users/register
Content-Type: application/json

{
  "username":  "johndoe",
  "email":  "john@example.com",
  "password": "securepassword123"
}
```

### Create a Post
```bash
POST /api/v1/posts
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my post",
  "tags": ["javascript", "nodejs"],
  "visibility": "public"
}
```

### Get All Posts
```bash
GET /api/v1/posts
```

## Development

The application runs on port 4000 by default (configurable via environment variables).

**Homepage**: Visit `http://localhost:4000/` to see a simple homepage message.

## Security Features

- Password hashing with bcryptjs (salt rounds: 10)
- JWT-based authentication
- Author verification for post updates and deletions
- Protected routes using authentication middleware

## License

ISC

## Author

[ghost-28-02](https://github.com/ghost-28-02)

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. 
```
