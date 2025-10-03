# 💸 Payments App

A modern, full-stack payments platform built with React and Express.js, featuring secure user authentication, real-time balance management, and seamless money transfers between users.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.1.0-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

### Core Functionality

- **User Authentication**: Secure signup and signin with JWT tokens
- **Money Transfers**: Send money instantly to other users
- **Balance Management**: Real-time balance tracking and updates
- **User Search**: Find and select recipients for transfers

### Security Features

- **Password Hashing**: Secure password storage with bcrypt
- **JWT Authentication**: Token-based authentication system
- **Input Validation**: Comprehensive validation with Zod schemas
- **Transaction Safety**: MongoDB transactions for data consistency
- **Middleware Protection**: Route protection with authentication middleware

### User Experience

- **Responsive Design**: Optimized for all device sizes
- **Toast Notifications**: Real-time feedback with Sonner
- **Modern UI**: Clean interface built with Tailwind CSS

## Tech Stack

### Frontend

- **Framework**: React with Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: Sonner

### Backend

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Validation**: Zod for schema validation
- **Middleware**: CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/harshthakkr/payments-app.git
   cd payments-app
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:

   ```bash
   cd ../backend
   touch .env
   ```

   Add your environment variables to `.env`:

   ```env
   # Database
   MONGODB_URI="mongodb://localhost:27017/payments-app"

   # JWT Secret
   JWT_SECRET="your_jwt_secret_key"

   # Server Configuration
   PORT=3001
   ```

5. **Database Setup**

   Make sure MongoDB is running on your system:

   ```bash
   # For macOS with Homebrew
   brew services start mongodb-community

   # For Linux
   sudo systemctl start mongod

   # For Windows
   net start MongoDB
   ```

6. **Run the Backend Server**

   ```bash
   cd backend
   npm start
   ```

7. **Run the Frontend Development Server**

   ```bash
   cd ../frontend
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## API Endpoints

### Authentication

- `POST /api/v1/user/signup` - Create new user account
- `POST /api/v1/user/signin` - User login
- `PUT /api/v1/user` - Update user profile
- `GET /api/v1/user/bulk` - Search users

### Account Management

- `GET /api/v1/account/balance` - Get current balance
- `POST /api/v1/account/transfer` - Transfer money to another user

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Harsh Thakkar - [@harshthkkr](https://x.com/harshthkkr)
