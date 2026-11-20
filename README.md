# Transtapp 💸

A basic PayTM-style peer-to-peer payments app. Users can sign up, get a starting balance, search for other users, and transfer money between accounts — with the transfer handled as an **atomic MongoDB transaction**.

## Features

- **User authentication** — signup / signin with email + password, passwords hashed with **argon2**, sessions via **JWT** (7-day expiry)
- **Auto-created wallet** — every new user gets an account with a random starting balance (₹1 – ₹10,000)
- **User search** — find other users by first/last name (`GET /user/bulk?filter=`), with debounced search in the UI
- **Balance check** — `GET /account/balance`
- **Money transfer** — `POST /account/transfer`, executed inside a **MongoDB transaction** (replica set) so both debit and credit succeed or neither does
- **Profile update** — `PATCH /user` for password / firstName / lastName
- **Dockerized MongoDB** — root `Dockerfile` spins up `mongo:4.4.7` as a replica set, which is required for transactions

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 8, Axios |
| Backend  | Node.js, Express 4, TypeScript |
| Database | MongoDB + Mongoose 8 (transactions via replica set) |
| Auth     | JWT (jsonwebtoken), argon2 password hashing |
| Validation | Zod |
| DevOps   | Docker (MongoDB replica set) |

## Project Structure

```
transtapp/
├── Dockerfile                  # MongoDB 4.4.7 as a replica set (required for transactions)
├── backend/
│   └── src/
│       ├── index.ts            # Express app entry (port 3000, mounts /api/v1)
│       ├── middleware/
│       │   └── usermiddleware.ts  # JWT Bearer-token auth guard
│       ├── models/
│       │   ├── user.ts         # users collection
│       │   └── accounts.ts     # account collection (User_id ref + balance)
│       └── routes/
│           ├── index.ts        # mounts /user and /account routers
│           ├── userRoute.ts    # signup, signin, update, bulk search
│           └── account.ts      # balance, transfer (transactional)
└── frontend/
    └── src/
        ├── App.tsx             # Routes: /signup /signin / /send
        ├── component/          # Appbar, Users, balance, sendMoney, authform, input, ...
        ├── hooks/useDebounce.ts
        └── routes/             # signup.tsx, signin.tsx, dashboard.tsx, send.tsx
```

## API Reference

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/user/signup` | No | Create account. Body: `{ username (email), password (min 8), firstName, lastName }`. Returns user + wallet with random balance |
| POST | `/user/signin` | No | Body: `{ username, password }`. Returns `{ token }` (JWT, 7d) |
| PATCH | `/user` | Yes | Update `{ password?, firstName?, lastName? }` |
| GET | `/user/bulk?filter=<name>` | Yes | Search users by first/last name |
| GET | `/account/balance` | Yes | Get authenticated user's balance |
| POST | `/account/transfer` | Yes | Body: `{ to: <userId>, amount: <number> }`. Atomic transfer inside a MongoDB transaction |

Authenticated requests need the header: `Authorization: Bearer <token>`

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (for the MongoDB replica set — the transfer endpoint uses transactions, which require one)

### 1. Start MongoDB (replica set)

```bash
docker build -t transtapp-mongo .
docker run -d --name transtapp-mongo -p 27017:27017 transtapp-mongo
```

### 2. Configure the backend

```bash
cd backend
```

Create a `.env` file:

```env
DB_URL=mongodb://localhost:27017/transtapp
JWT_SECRET=your-secret-key
```

> ⚠️ Note: the code reads `JWT_SECRET` in some places and the misspelled `JWT_SCRET` in others. Setting **both** variables to the same value guarantees everything works:
>
> ```env
> JWT_SECRET=your-secret-key
> JWT_SCRET=your-secret-key
> ```

### 3. Run the backend

```bash
npm install
npm run dev        # compiles TS and starts on http://localhost:3000
```

### 4. Run the frontend

```bash
cd frontend
npm install
npm run dev        # starts Vite dev server
```

Then open the Vite URL (default `http://localhost:5173`), sign up, and try sending money to another user.

## Known Quirks

- New accounts get a **random balance between 1 and 10,000** (`1 + Math.random() * 10000`) — handy for demos.
- The JWT env var is misspelled as `JWT_SCRET` in `middleware/usermiddleware.ts` (signin falls back with `JWT_SECRET ?? JWT_SCRET`).
- MongoDB must run as a **replica set** — plain standalone `mongod` will fail on `/account/transfer` with a transaction error.

## License

ISC
