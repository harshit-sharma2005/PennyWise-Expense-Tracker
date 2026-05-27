# PennyWise - Expense Tracker

A full-stack expense tracking app built with the MERN stack. Track income, manage expenses, visualize spending patterns, and download reports.

## Features

- **Authentication** — Register, login with JWT-based auth
- **Dashboard** — Total balance, income & expense overview with pie charts
- **Income Management** — Add, view, delete income with source-wise breakdown
- **Expense Management** — Add, view, delete expenses with category-wise breakdown
- **Charts & Visuals** — Pie charts, bar charts for last 30/60 day trends
- **Excel Download** — Export income & expense data as `.xlsx`

## Tech Stack

| Layer    | Tech                                      |
|----------|-------------------------------------------|
| Frontend | React, Tailwind CSS, Recharts, Vite       |
| Backend  | Node.js, Express                          |
| Database | MongoDB, Mongoose                         |
| Auth     | JWT, bcryptjs                             |

## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB URI

### Backend

```bash
cd backEnd
npm install
```

Create a `.env` file:

```
MONGO_URI=mongodb://localhost:27017/pennywise
JWT_SECRET=your_secret_key
PORT=8000
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend

```bash
cd frontEnd/expense-tracker
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
backEnd/
├── controllers/    # Auth, income, expense, dashboard logic
├── models/         # User, Income, Expense schemas
├── routes/         # API route definitions
├── middleware/      # JWT auth, file upload
└── server.js

frontEnd/expense-tracker/src/
├── pages/          # Home, Income, Expense, Login, SignUp
├── components/     # Charts, cards, layouts, inputs
├── context/        # User context provider
├── hooks/          # Auth hook
└── utils/          # API paths, axios config, helpers
```