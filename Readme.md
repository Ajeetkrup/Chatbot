# 🤖 Chatbot

A simple chatbot built with **FastAPI** (backend) and **React + Vite** (frontend).
The chatbot uses **Google Gemini API** to generate intelligent responses and includes a profanity filter for safe conversations.

---

## 🌐 Live Demo

Frontend (React + Vite): [Chatbot App](https://chatbot-black-delta.vercel.app/)
Backend (FastAPI + Render): `https://chatbot-aavm.onrender.com`

---

## 🛠️ Tech Stack

* **Frontend**: React + Vite (deployed on Vercel)
* **Backend**: FastAPI (deployed on Render)
* **AI Model**: Google Gemini API
* **Safety**: Profanity filter for user input/output

---

## 🚀 Getting Started

### 🔹 Clone the repo

```bash
git clone https://github.com/your-username/chatbot-app.git
cd chatbot-app
```

---

### 🔹 Backend (FastAPI)

1. Navigate to backend:

   ```bash
   cd backend
   ```
2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Create `.env` file:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```
5. Run locally:

   ```bash
   uvicorn main:app --reload
   ```
6. API available at:

   ```
   http://127.0.0.1:8000/chat/
   ```

---

### 🔹 Frontend (React + Vite)

1. Navigate to frontend:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file:

   ```
   VITE_API_URL=http://127.0.0.1:8000
   ```
4. Run locally:

   ```bash
   npm run dev
   ```
5. App available at:

   ```
   http://localhost:5173
   ```

---

## 📦 Deployment

* **Frontend** → Vercel (`npm run build`)
* **Backend** → Render (`uvicorn main:app --host 0.0.0.0 --port $PORT`)

---

## ✅ Features

* User sends a message from React frontend
* Backend calls Gemini API for response
* Profanity filter removes offensive words
* Clean UI with fast response times

---

## 📌 License

MIT License © 2025