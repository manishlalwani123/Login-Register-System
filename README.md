# Login-Register-System
# 🔐 Auth Demo with Node.js, Express, MongoDB

This is a basic user authentication system using **Node.js**, **Express**, and **MongoDB**, with frontend pages for **login**, **registration**, and a protected **dashboard**. It uses **cookies** for session tracking.

---

## 📁 Project Structure

auth-demo/
├── server.js # Express backend
├── public/
│ ├── index.html # Landing page (redirects to login if not authenticated)
│ ├── login.html # Login form
│ ├── register.html # Registration form
│ ├── dashboard.html # Protected page for logged-in users
│ └── script.js # Handles frontend logic and API requests


---

## 🚀 Features

- Register new users
- Login existing users
- Session-based auth via cookies
- Redirects to dashboard if logged in
- Logout functionality
- Dashboard shows all registered users

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Frontend:** HTML, CSS, JavaScript
- **Session Tracking:** Cookies (via `cookie-parser`)
- **Cross-Origin Requests:** CORS enabled for frontend

---

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/auth-demo.git
   cd auth-demo

   
2.Install dependencies:

bash

npm install
Run MongoDB locally:
Make sure MongoDB is running on mongodb://localhost:27017.

Start the server:

bash
Copy code
node server.js
Open Frontend:

Use Live Server or serve files manually.

Frontend runs on http://localhost:5500

🧪 Test Flow
Go to http://localhost:5500/register.html and create an account.

Redirects to login.

Login to access dashboard.html.

Use the Logout button to clear the session.

📄 License
This project is licensed under the MIT License.

yaml
Copy code

---

Replace `https://github.com/your-username/auth-demo.git` with your actual GitHub repo URL.



