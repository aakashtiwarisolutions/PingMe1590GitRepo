# PingMe

> One QR code for your entire digital identity.

PingMe lets users share everything — social profiles, contact details, portfolio, GitHub, featured projects — through a single QR code.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Cloud | AWS S3 (SDK v3) |
| Dev Tools | Nodemon, dotenv, Morgan, Helmet |

---

## Project Structure

```
backend/
├── src/
│   ├── server.js              ← Entry point (DB connect + listen)
│   ├── app.js                 ← Express app (middleware + routes)
│   ├── config/
│   │   └── s3Client.js        ← AWS S3 client
│   ├── models/
│   │   └── user.js            ← User schema (name, email, bio, qrId, links[])
│   ├── controllers/
│   │   ├── userController.js  ← CRUD logic
│   │   └── exportController.js← S3 export logic
│   ├── routes/
│   │   ├── userRoutes.js      ← /api/users
│   │   ├── exportRoutes.js    ← /api/export
│   │   ├── upload.routes.js   ← /api/upload
│   │   └── health.routes.js   ← /api/health
│   └── middleware/
│       └── errorHandler.js    ← Global error handler
├── SQLquery.sql               ← PostgreSQL ETL schema (future use)
├── package.json
└── .env.example
```

---

## API Endpoints

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server + DB status check |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Export (MongoDB → S3)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/export` | Export all users to S3 |
| GET | `/api/export/:userId` | Export one user to S3 |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload a raw text message to S3 |

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/aakashtiwarisolutions/PingMe1590GitRepo.git
cd PingMe1590GitRepo/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your values:
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/pingme
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
```

### 4. Start the server
```bash
npm run dev
```
Server runs at: `http://localhost:4000`

---

## User Schema

```json
{
  "name": "Aakash Tiwari",
  "email": "aakash@example.com",
  "bio": "Builder. Developer.",
  "qrId": "aakash1590",
  "links": [
    { "type": "github", "label": "My GitHub", "url": "https://github.com/aakashtiwarisolutions", "isVisible": true, "orderIndex": 1 },
    { "type": "linkedin", "label": "LinkedIn", "url": "https://linkedin.com/in/yourname", "isVisible": true, "orderIndex": 2 }
  ]
}
```

---

## Author

**Aakash Tiwari** — [github.com/aakashtiwarisolutions](https://github.com/aakashtiwarisolutions)
