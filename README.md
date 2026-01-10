\# Sahayata Connect – NGO Event \& Campaign Management System



Sahayata Connect is a full-stack MERN web application developed to provide a centralized platform for managing NGO events and volunteer registrations. The system bridges the gap between non-profit organizations and volunteers by digitizing event discovery, registration, and administration.



---



\## 🔹 Project Overview



Many NGOs rely on manual and fragmented methods for event promotion and volunteer management. Sahayata Connect solves this problem by offering:



\- A public platform for volunteers to discover and register for events

\- A secure admin dashboard for managing events and monitoring platform activity

\- A centralized backend system for authentication, data storage, and analytics



The project follows a \*\*three-tier MERN architecture\*\* and is fully functional.



---



\## 🔹 Technology Stack



\*\*Frontend (User Site):\*\*

\- React.js

\- HTML5, CSS3, JavaScript

\- React Router



\*\*Frontend (Admin Panel):\*\*

\- React.js

\- SB Admin 2 (Bootstrap-based UI)



\*\*Backend:\*\*

\- Node.js

\- Express.js

\- MongoDB (Atlas)

\- Mongoose ODM

\- JWT Authentication

\- Bcrypt.js

\- Express File Upload



---



\## 🔹 Project Structure



sahayata-connect/

│

├── site/ # User-facing React application

├── admin/ # Admin dashboard React application

└── server/ # Backend API (Node + Express)





---



\## 🔹 Core Features



\### 👤 User (Volunteer)

\- User registration and login

\- Secure password reset using token-based authentication

\- Browse and search events

\- View event details

\- Register for events

\- View registered events in profile



\### 🛠 Admin

\- Secure admin login

\- Dashboard with real-time statistics

\- Add events with image upload

\- View and delete events

\- View all users

\- View all event registrations

\- Monthly and recent event analytics



---



\## 🔹 Authentication \& Security



\- JWT-based authentication for users

\- Password hashing using bcrypt

\- Token expiration handling

\- Admin access restricted via protected routes

\- Environment variables used for sensitive credentials



---



\## 🔹 Environment Configuration



Create a `.env` file inside the `server` folder:



PORT=2000

MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret





⚠️ Do not commit `.env` to GitHub.



---



\## 🔹 Installation \& Running the Project



\### 1️⃣ Clone the repository

```bash

git clone https://github.com/your-username/sahayata-connect.git

cd sahayata-connect



2️⃣ Backend setup



cd server

npm install

npm start





3️⃣ User site setup



cd ../site

npm install

npm start





4️⃣ Admin panel setup



cd ../admin

npm install

npm start







🔹 Testing

Unit testing for backend controllers



Integration testing between frontend and backend



Manual user acceptance testing (UAT)



All major use cases have been tested and verified.



🔹 Current Limitations

Donation feature is UI-only (no payment gateway)



NGOs cannot self-manage events (admin-only control)



No feedback or rating system



No notification system



🔹 Future Enhancements

Payment gateway integration



Dedicated NGO dashboard



Advanced analytics and reporting



Email and in-app notifications



Mobile application (Android/iOS)



🔹 Academic Context

This project was developed as part of Industrial Training under Techno Exponent, certified by Euphoria Genx, and submitted to Brainware University.



🔹 Author

Shibam Hazra

B.Tech CSE (Data Science)

Brainware University





