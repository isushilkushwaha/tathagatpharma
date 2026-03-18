# 🏥 Tathagat Pharma – Medical Website & Admin System

A modern **full-stack medical web application** built using **Next.js, Tailwind CSS, shadcn/ui, Firebase**, and deployed on **Vercel**.
This platform allows patients to **book appointments, read blogs, and submit reviews**, while admins can **manage content and data through a secure dashboard**.

---

## 🚀 Live Demo

👉 https://tathagatpharma.in *(Current static version on Netlify)*
👉 *(Next.js version will be deployed on Vercel)*

---

## 📌 Features

### 👨‍⚕️ Admin Panel (2 Admins)

* Secure login using Firebase Authentication
* Add / Edit / Delete blog posts
* Approve or reject patient reviews
* View and manage appointment data
* Dashboard accessible via web & mobile (PWA)

---

### 🧑‍🤝‍🧑 User / Patient Features

* View medical blogs and health tips
* Submit reviews/feedback
* Book appointments online
* Install website as an Android app (PWA)

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* shadcn/ui

### Backend

* Firebase Authentication
* Firebase Firestore Database

### Deployment

* Vercel (Next.js hosting)
* Netlify (current static version)

### Package Manager

* pnpm

---

## 📂 Project Structure

```
src/
│
├ app/
│   ├ page.tsx              # Home Page
│   ├ blog/                 # Blog pages
│   ├ reviews/              # Patient reviews
│   ├ appointment/          # Appointment form
│   ├ admin/
│   │   ├ login/            # Admin login
│   │   └ dashboard/        # Admin dashboard
│
├ components/
│   ├ ui/                   # shadcn UI components
│   ├ shared/               # Navbar, Footer
│
├ lib/
│   ├ firebase.ts           # Firebase config
│
├ styles/
│   └ globals.css
```

---

## 🔥 Key Functionalities

### 📝 Blog System

* Only admins can create and manage blogs
* Dynamic blog pages using Next.js

---

### ⭐ Review System

* Users submit reviews via form
* Stored in Firebase with `pending` status
* Admin approves before publishing

---

### 📅 Appointment System

* Patients submit appointment requests
* Data stored in Firebase
* Admin can view all appointments

---

## 🔐 Authentication

* Firebase Authentication used for admin login
* Only authorized admins can access dashboard

---

## 📱 PWA Support

* Website can be installed as an Android app
* Works like a native app
* No Play Store required

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/tathagatpharma.git
cd tathagatpharma
```

---

### 2️⃣ Install Dependencies

```bash
pnpm install
```

---

### 3️⃣ Run Development Server

```bash
pnpm dev
```

---

### 4️⃣ Setup Firebase

Create a Firebase project and add config in:

```
src/lib/firebase.ts
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy

---

## 📈 Future Enhancements

* AI-based medical report summarizer
* Doctor dashboard
* Email/SMS notifications
* Payment integration
* Multi-language support

---

## 👨‍💻 Author

**Sushil Kushwaha**
Final Year BCA Student

---

## ⭐ Project Purpose

This project is built for:

* Final year project submission
* Portfolio for placements
* Real-world medical website solution

---

## 📜 License

This project is for educational and personal use.
