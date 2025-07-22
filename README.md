# WTWR Backend (What To Wear 👕🌦️)

The WTWR (What To Wear) backend is a RESTful API server built to support a full-stack weather-based clothing app. It provides user authentication, clothing item management, and integrates authorization logic to ensure users can only manage their own data.

The project handles user registration, login, and secure access to a personalized wardrobe based on weather conditions. It also includes robust validation, error handling, and logging systems.



## 🔧 Technologies and Tools
- Node.js & Express
- MongoDB & Mongoose
- Postman
- Nginx
- Certbot (SSL cerfications)
- JWT (JSON Web Tokens)
- Celebrate & Joi (validation)
- Validator.js (URL/email validation)
- ESLint (Airbnb Base)
- Prettier (code formatting)
- dotenv
- Winston & Morgan (logging)
- Git & GitHub

## 🗂️ Project Structure
.
├── controllers/        # Route controllers
├── middlewares/        # Auth, error handling
├── errors/             # Custom error classes
├── routes/             # API routing logic
├── models/             # Mongoose schemas
├── utils/              # Utility constants (error codes)
├── logs/               # Error and request logs
├── .eslintrc           # Linter config (Airbnb base)
├── .editorconfig       # Editor consistency config
├── .gitignore
├── package.json
└── README.md

## 🚀 Features

### 👤 User Routes
| Endpoint          | Description             |
| ----------------- | ----------------------- |
| `POST /signup`    | Register a new user     |
| `POST /signin`    | Login and receive JWT   |
| `GET /users/me`   | Get current user's data |
| `PATCH /users/me` | Update profile info     |


### 🧥 Clothing Item Routes
| Endpoint                  | Description               |
| ------------------------- | ------------------------- |
| `GET /items`              | Get all items             |
| `POST /items`             | Add a new clothing item   |
| `DELETE /items/:id`       | Delete an item (if owner) |
| `PUT /items/:id/likes`    | Like an item              |
| `DELETE /items/:id/likes` | Unlike an item            |


### 🔐 Authentication & Authorization
- JWT-based authentication

- Secure password hashing with bcrypt

- Auth middleware protecting private routes

- Public access to:

- POST /signin

- POST /signup

- GET /items

### ⚠️ Error Handling
- Centralized error handler

- Custom error classes: BadRequest, Unauthorized, Forbidden, NotFound, Conflict, ServerError

- Celebrate validation with Joi

- Returns proper status codes:
  - 400, 401, 403, 404, 409, 500

### 📝 Logging
- Request logs: logs/request.log

- Error logs: logs/error.log

- Logging with winston and morgan

- Logs are gitignored


## 🌐 Deployment
Backend URL: [https:/api.wtwr-kenya.crabdance.com]

Frontend URL: [https://wtwr-kenya.crabdance.com/]

The backend supports both HTTP and HTTPS connections.


## 🧪 Scripts
npm run start    # Start the server on port 3001
npm run dev      # Start server in dev mode with hot reload
npm run lint     # Run ESLint check

## 📦 Environment & Config
- MongoDB URI: mongodb://localhost:27017/wtwr_db

- Node.js version: ≥ 16.x

- JWT secret via .env

- Uses process.env.NODE_ENV !== 'production' for environment detection

## 🧪 Crash Recovery Test
Trigger the crash test with:
  GET /crash-test
The server should recover automatically and continue responding to requests.

## ✅ Linting & Code Style
- Uses Airbnb Base ESLint config with _id rule exception

- No inline disables

- Code formatted with Prettier

## 🧑 User Model
{
  name: String (2–30 chars),
  avatar: URL String,
  email: String (unique, valid email),
  password: String (select: false)
}

## 👚 ClothingItem Model
{
  name: String (2–30 chars),
  imageUrl: URL String,
  weather: String ('hot' | 'warm' | 'cold'),
  owner: ObjectId (User),
  likes: [ObjectId (User)],
  createdAt: Date
}


## 🔒 Security Highlights
- Passwords are hashed with bcrypt before storage

- JWT token expires in 7 days

- Unauthorized users can’t modify or delete items

- Password hashes are never returned in API responses


## 📚 Author
- Name: Kenya Peterson

- GitHub: Kenya-P [https://github.com/Kenya-P]

- Email: kenyap013@gmail.com





Created a subdomain name using [https://freedns.afraid.org/subdomain/]
- wtwr-kenya.crabdance.com	A	35.237.6.54
- www.wtwr-kenya.crabdance.com
- api.wtwr-kenya.crabdance.com


