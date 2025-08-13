# Simple To-Do Application

This project is a full-stack To-Do application built with React (frontend) and Node.js with Express (backend).

---

## Features

- Add new to-do items  
- Mark to-dos as completed  
- Delete to-do items  
- Persistent to-dos stored in memory during runtime  
- Basic error handling and CORS support  

---

## Prerequisites

- Node.js and npm installed  
- Terminal or command prompt access  

---

## Getting Started

### Backend Setup

1. Navigate to the backend folder (where `server.js` is located):  
   ```bash
   cd server

2. Install dependencies (if you haven't already):
    ```bash
    npm init -y
    npm install express cors

3. Start the server:
    ```bash
    node server.js

4. The backend will run on port 5001 and can be accessed at:
    ```bash
    http://localhost:5001/api/todos

### Frontend Setup

1. Navigate to the React app folder:
    ```bash
    cd client

2. Install dependencies
    ```bash
    npm install

3. Make sure the React app’s package.json has the following proxy setting to forward API calls to the backend:
    ```json
    "proxy": "http://localhost:5001"

4. Start the React development server:
    ```bash
    npm start

5. Open your browser and visit:
    ```arduino
    http://localhost:3000

---

## How to use

- Type a task into the input box and click Add to create a new to-do item.
- Click on a to-do text to toggle its completed status (it will get a line-through style).
- Click the ❌ button to delete a to-do item.
- The list updates in real-time, synced with the backend.

---

## Notes

- The backend stores data in memory, so all to-dos reset when the server restarts.
- For production, consider integrating a database like MongoDB or PostgreSQL.
