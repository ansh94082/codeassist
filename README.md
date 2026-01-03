# 🚀 CodeAssist – Real-Time Code Collaboration Platform

CodeAssist is a **production-ready full-stack web application** that enables **real-time collaborative coding** using WebSockets.  
It is built with modern technologies, deployed on a Linux server, and designed to handle authentication, live sessions, and scalability concerns.

---

## 🌟 Overview

CodeAssist allows multiple users to:
- Join shared coding sessions
- Collaborate in real time
- Stay in sync with instant updates powered by WebSockets
- Authenticate securely using OAuth

The project focuses heavily on **real-world deployment challenges**, not just local development.

---

## ✨ Key Features

- 🔐 **Secure Authentication**
  - OAuth using Google & GitHub
  - Session handling with NextAuth

- ⚡ **Real-Time Collaboration**
  - WebSocket-based communication
  - Instant updates across connected clients

- 🧠 **Scalable Architecture**
  - Separate frontend and WebSocket server
  - Optimized for production workloads

- 🎨 **Modern UI**
  - Responsive design
  - Built with Tailwind CSS

- 🗄️ **Robust Database Layer**
  - PostgreSQL with Prisma ORM
  - Clean schema migrations

- ☁️ **Production Deployment**
  - Azure Linux VM
  - Nginx reverse proxy
  - PM2 process manager
  - HTTPS with SSL certificates

---

## 🧩 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS

### Backend
- Node.js
- WebSockets

### Database
- PostgreSQL
- Prisma ORM

### DevOps / Infrastructure
- Azure Linux VM
- Nginx
- PM2
- SSL / HTTPS
- WebSocket Proxying

### Developer Tools
- Git & GitHub
- Postman
- Vercel (testing)
- Linux

---

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ansh94082/codeassist
```
2️⃣ Run the Frontend

```bash
Copy code
cd codeassist/client
npm install
npm run dev
```
🖥️ Starts the Next.js development server.

3️⃣ Run the WebSocket Server (New Terminal)
```bash
Copy code
cd codeassist/websocket
node index.js ```
🔌 Starts the WebSocket server for real-time collaboration.

⚙️ How CodeAssist Works
👤 User logs in using OAuth (Google / GitHub)

🔐 Secure session is created

🧑‍🤝‍🧑 Users join a shared coding room

🔄 WebSockets broadcast code changes instantly

🗃️ Database stores user & session metadata

🚀 Nginx routes HTTPS & WebSocket traffic

⚡ PM2 ensures backend reliability

🧠 Engineering Challenges Solved
✅ WebSocket reverse proxy through Nginx

✅ OAuth callback & session issues

✅ HTTPS & SSL certificate management

✅ Prisma migration conflicts

✅ Memory leaks & process optimization

✅ Production debugging on Linux VM

📦 Deployment Highlights
Frontend, backend, and database deployed on Azure Linux VM

Nginx configured for:

HTTPS

WebSocket upgrades

Reverse proxy

PM2 used for:

Process management

Auto-restarts

Monitoring

🛠️ Future Improvements
🔄 Collaborative cursor support

🧪 Test coverage

📊 Usage analytics

📱 Mobile responsiveness enhancements

📌 Project Status
✅ Production deployed
🚧 Actively improving and refactoring

⭐ Support
If you find this project useful:

⭐ Star the repository

🍴 Fork it

🧠 Learn from it

Built with ❤️ by Ansh

