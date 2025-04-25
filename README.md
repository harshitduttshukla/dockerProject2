🛠️ MERN Auth App – Dockerized
A full-stack authentication app built with MongoDB, Express, React, and Node.js, fully containerized using Docker and orchestrated with Docker Compose.

📦 Features
🔐 User Signup & Signin with validation

✅ JWT-based authentication

🚀 Dockerized for easy deployment

⚡ Zod-based schema validation

🧰 Tech Stack
Frontend: React + Axios + Tailwind (or your styling choice)

Backend: Node.js + Express + Zod + JWT + bcrypt

Database: MongoDB

Containerization: Docker + Docker Compose

📁 Folder Structure
bash
Copy
Edit
project-root/
├── client/           # React frontend
├── server/           # Node.js + Express backend
├── docker-compose.yml
├── README.md
🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Add .env files
🔹 server/.env
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://mongo:27017/mern-auth
JWT_SECRET=yourSecretKey
🔹 client/.env
env
Copy
Edit
REACT_APP_API_URL=http://localhost:5000/api/v1
3. Build and Start with Docker
bash
Copy
Edit
docker-compose up --build
Frontend: http://localhost:3000

Backend: http://localhost:5000/api/v1

MongoDB: default port inside container

4. API Endpoints
🔹 POST /api/v1/signup
json
Copy
Edit
{
  "username": "harshit",
  "password": "Harshit@123"
}
🔹 POST /api/v1/signin
json
Copy
Edit
{
  "username": "harshit",
  "password": "Harshit@123"
}
Returns:

json
Copy
Edit
{
  "token": "your.jwt.token"
}
🐳 Docker Overview
🔹 docker-compose.yml
yaml
Copy
Edit
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/mern-auth
      - JWT_SECRET=yourSecretKey
    depends_on:
      - mongo

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api/v1
    depends_on:
      - backend

  mongo:
    image: mongo
    ports:
      - "27017:27017"
🧪 Sample Users
✅ Sample Signup Credentials
Username	Password
harshit	Harshit@123
johnDoe	Test@1234
📌 Notes
Make sure Docker Desktop is running

If using Postman/Thunder Client, send Content-Type: application/json

For protected routes, send Authorization: Bearer <token>

🤝 Credits
Built by Harshit Shukla 🚀
Thanks to 100xDevs & Hitesh Choudhary