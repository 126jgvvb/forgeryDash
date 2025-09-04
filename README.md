# Forgery Dashboard

Forgery Dashboard is a web application built with **React (Vite)**, **Redux Toolkit**, and a **Node.js + Express backend**.  
It provides an interface to track and manage forgery attempts, upload related images, and monitor admin/server activity.

---

##  Features

- 📊 **Forgery Management**
  - Add new forgery records with details (Name, MSISDN, Images).
  - Delete forgery entries with automatic cleanup of related files.
  - View forgery details and past attempts.

- 🖼️ **Image Handling**
  - Upload multiple images (handled with `multer` on backend).
  - Serve uploaded images from a local `/uploads` directory.
  - Render stored images dynamically in the dashboard.

- 🔗 **Backend Integration**
  - REST API with endpoints for:
    - `/admin/ping` → check if the server is active.
    - `/admin/get-redux-object` → get the full Redux state object.
    - `/admin/get-forgeries` → fetch only the forgeries array.
    - `/admin/add-forgery-item` → add a new forgery with images.
    - `/admin/update-forgery/:id` → update an existing forgery (append new images, names, or msisdn).
    - `/admin/delete-forgery/:id` → delete a forgery and its images.
    - `/admin/update-last-attempt` → update `lastForgeryAttempt`.

-  **Frontend**
  - Built with **React + Vite**.
  - State management using **Redux Toolkit**.
  - Tailwind CSS for modern, responsive UI design.
  - React Router for navigation between dashboard and details page.

---

##  Project Structure
forgeryDash/
├── backend/ # Node.js + Express server
│ ├── server.js # API endpoints & static serving
│ ├── uploads/ # Uploaded images storage
│ └── forgeries.json # Persistent data store
│
├── src/ # React frontend (Vite)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Dashboard, Details, etc.
│ ├── redux/ # Redux Toolkit slice (defaultSlice.js)
│ ├── App.jsx # App entry point
│ ├── main.jsx # React + Router bootstrap
│ └── ...
│
├── public/ # Static assets
├── build/ # Production build (served by backend)
├── package.json
└── README.md


Technologies Used

Frontend:

React (Vite)

Redux Toolkit

Tailwind CSS

React Router

Backend:

Node.js + Express

Multer (file uploads)

CORS

File System storage (JSON + uploads)

API Examples

GET /admin/ping

GET /admin/get-forgeries

POST /admin/add-forgery-item
Content-Type: multipart/form-data

{
  name: "John Doe",
  msisdn: "0712345678",
  images: [file1.jpg, file2.jpg]
}

DELETE /admin/delete-forgery/1234



