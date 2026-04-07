
# 🏥 Tathagat Pharma – Medical Appointment & Clinic Management System

A full-stack medical web application designed to simplify appointment booking, clinic management, and patient interaction. This project demonstrates real-world implementation of modern web technologies with a focus on performance, scalability, and user experience.

---

## 🚀 Live Project

🌐 https://www.tathagatpharma.in

---

## 📌 Features

### 👨‍⚕️ User Side (Frontend)

* 🏠 Home Page with clinic overview
* 👨‍⚕️ Doctor Information Section
* 🩺 Services Listing
* 📅 Appointment Booking System
* ❓ FAQ Section
* 📝 Blog Section (Health Articles)
* ⭐ Reviews & Ratings
* 💬 Feedback Form
* 📱 Fully Responsive (Mobile + Desktop)
* 📲 Progressive Web App (PWA – Installable)

---

### 🔐 Admin Panel

* 📊 Dashboard (Overview & Control Panel)
* 📅 Appointment Management

  * Booking notification via email
  * Approval/Rejection with email confirmation
* 📝 Blog Management (Create / Update / Delete)
* ⭐ Rating & Feedback Moderation
* ❓ FAQ Management

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ Next.js (React Framework)
* 🎨 Tailwind CSS
* 🧩 shadcn/ui (Reusable UI Components)

### Backend (BaaS)

* 🔥 Firebase

  * Authentication
  * Firestore Database
  * Hosting (optional services)

### Other Tools

* 📦 pnpm (Package Manager)
* ☁️ Vercel (Deployment)
* 🌐 Hostinger (Domain & Hosting)
* 📲 Web App Manifest (PWA Support)

---

## ⚙️ Project Structure (Simplified)

```
/src
  /app
    /admin        → Admin Panel
    /api          → API Routes
    /components   → Reusable UI Components
    /pages        → Main Pages
  /lib            → Firebase & Utility Config
/public           → Static Assets + Manifest
```

---

## ✨ Key Functionalities

* 📩 **Email Notification System**

  * Appointment booked → Email sent
  * Appointment approved → Confirmation email sent

* 🔄 **Admin-Controlled Workflow**

  * Admin manages all appointments
  * Controls blogs, feedback, and FAQs

* 📲 **PWA Support**

  * Installable on mobile and desktop
  * Fast loading and offline-ready features

* 📱 **Responsive Design**

  * Optimized for all Android devices

---

## 🧑‍💻 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/tathagatpharma.git

# Navigate to project
cd tathagatpharma

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 📦 Deployment

* **Frontend & API** → Vercel
* **Domain** → Hostinger
* **Backend Services** → Firebase

---

## 🎯 Learning Outcomes

This project helped in:

* Building a **real-world full-stack application**
* Working with **Firebase as Backend-as-a-Service**
* Implementing **admin-controlled architecture**
* Managing **authentication & database**
* Creating **responsive and scalable UI**
* Deploying production-ready apps

---

## 📌 Future Improvements

* 👨‍⚕️ Doctor Login Dashboard
* 📊 Advanced Analytics for Admin
* 💳 Online Payment Integration
* 🔔 Real-time Notifications
* 📅 Calendar Integration

---

## 👨‍💻 Author

**Sushil Kushwaha**


---

## 💬 Feedback

Feedback and suggestions are always welcome!
If you like this project, consider giving it a ⭐ on GitHub.

