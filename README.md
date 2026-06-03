# PingMe

**One QR code for your entire digital identity.**

PingMe solves a simple problem — you have too many links. Instagram, LinkedIn, GitHub, portfolio, email. Instead of sending them one by one, PingMe gives you a single QR code that connects to everything.

Scan once. Access all.

Built for students, professionals, creators, and anyone who networks.

---

## What PingMe Does

When someone scans your QR code, they land on your PingMe profile — a single page with all your social links, contact details, portfolio, and featured projects. You control what shows, what order it appears in, and who sees what.

No more "let me send you my LinkedIn... actually wait, here's my GitHub too... and my portfolio..."

Just one scan.

---

## Current Status

The backend is live and working. The web frontend and full QR generation are in active development.

| Layer | Status |
|-------|--------|
| REST API (Node.js + Express) | ✅ Done |
| MongoDB database | ✅ Done |
| AWS S3 export | ✅ Done |
| QR code generation | 🔧 Coming soon |
| Web application (frontend) | 🔧 Coming soon |
| AWS Lambda + Step Functions | 🔧 Planned |
| PostgreSQL migration | 🔧 Planned |

---

## Tech Stack

### Backend
- **Node.js** — runtime
- **Express.js v5** — web framework
- **Mongoose** — MongoDB object modeling
- **MongoDB** — primary database (local dev)

### Cloud
- **AWS S3** — file storage and profile exports
- **AWS SDK v3** — official AWS client for Node.js
- **AWS Lambda** — serverless functions *(planned)*
- **AWS Step Functions** — workflow orchestration *(planned)*

### Dev Tools
- **Nodemon** — auto-restart on file changes
- **dotenv** — environment variable management
- **Morgan** — HTTP request logger
- **Helmet** — security headers
- **CORS** — cross-origin request handling

---

## Project Structure

```
PingMe/
├── backend/
│   ├── src/
│   │   ├── server.js                  ← Entry point — connects DB then starts server
│   │   ├── app.js                     ← Express setup — middleware and routes
│   │   ├── config/
│   │   │   └── s3Client.js            ← AWS S3 client configuration
│   │   ├── models/
│   │   │   └── user.js                ← User schema (name, email, bio, qrId, links[])
│   │   ├── controllers/
│   │   │   ├── userController.js      ← All user CRUD logic
│   │   │   └── exportController.js    ← S3 export logic (single + bulk)
│   │   ├── routes/
│   │   │   ├── userRoutes.js          ← /api/users
│   │   │   ├── exportRoutes.js        ← /api/export
│   │   │   ├── upload.routes.js       ← /api/upload
│   │   │   └── health.routes.js       ← /api/health
│   │   └── middleware/
│   │       └── errorHandler.js        ← Global error handling
│   ├── SQLquery.sql                   ← PostgreSQL ETL schema (future migration)
│   ├── package.json
│   └── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

---

## API Reference

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Returns server status and MongoDB connection state |

**Response:**
```json
{
  "success": true,
  "server": "online",
  "database": "connected",
  "timestamp": "2026-06-03T10:00:00.000Z"
}
```

---

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user profile |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a single user by ID |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

**Create user — example request body:**
```json
{
  "name": "Aakash Tiwari",
  "email": "aakash@example.com",
  "bio": "Builder. Developer.",
  "qrId": "aakash1590",
  "links": [
    {
      "type": "github",
      "label": "GitHub",
      "url": "https://github.com/aakashtiwarisolutions",
      "isVisible": true,
      "orderIndex": 1
    },
    {
      "type": "linkedin",
      "label": "LinkedIn",
      "url": "https://linkedin.com/in/aakash-tiwari-46b6b916b",
      "isVisible": true,
      "orderIndex": 2
    }
  ]
}
```

---

### Export to S3

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/export` | Export all user profiles to S3 as .txt files |
| GET | `/api/export/:userId` | Export a single user profile to S3 |

This is the full data flow: **MongoDB → API → File → AWS S3**

**Response:**
```json
{
  "success": true,
  "message": "Profile exported to S3 successfully",
  "data": {
    "userId": "abc123",
    "fileName": "profiles/abc123_1234567890.txt",
    "fileUrl": "https://your-bucket.s3.ap-south-1.amazonaws.com/profiles/abc123_1234567890.txt"
  }
}
```

---

### Upload

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload a raw text message directly to S3 |

---

## Getting Started

### Prerequisites
- Node.js v20+
- MongoDB running locally
- AWS account with an S3 bucket

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
# Mac/Linux
cp .env.example .env

# Windows
copy .env.example .env
```

Edit `.env` with your actual values:
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/pingme

AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
```

### 4. Start MongoDB
```bash
# Mac
brew services start mongodb-community

# Windows
net start MongoDB
```

### 5. Run the server
```bash
npm run dev
```

Server starts at: `http://localhost:4000`

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:4000
```

---

## Branch Workflow

This repo follows a 4-branch Git workflow:

```
Dev → Test → Stage → Prod
```

| Branch | Purpose |
|--------|---------|
| `Dev` | Active development — all new code goes here first |
| `Test` | QA and API testing — verify before moving forward |
| `Stage` | Pre-production — mirrors Prod, final check before release |
| `Prod` | Live stable code — only merge here when Stage is verified |

**Never push untested code directly to Prod.**

---

## Roadmap

### Phase 1 — Backend Foundation ✅
- REST API with full CRUD
- MongoDB integration
- AWS S3 export pipeline
- Git branch workflow

### Phase 2 — QR Generation 🔧
- Generate unique QR codes per user using `qrId`
- Store QR image in S3
- Return scannable QR on profile creation

### Phase 3 — Web Application 🔧
- Frontend for creating and viewing profiles
- Public profile page at `/u/:qrId`
- Dashboard for managing links

### Phase 4 — AWS Expansion 🔧
- AWS Lambda for serverless export jobs
- AWS Step Functions for multi-step workflows (e.g. create user → generate QR → send email)
- PostgreSQL migration using existing ETL schema (`SQLquery.sql`)

---

## User Schema

```js
{
  name: String,           // required
  email: String,          // required, unique
  bio: String,
  qrId: String,           // unique identifier used for QR code URL
  links: [
    {
      type: String,       // e.g. "github", "linkedin", "instagram"
      label: String,      // display name
      url: String,        // required
      isVisible: Boolean, // show/hide on profile
      orderIndex: Number  // controls display order
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Author

**Aakash Tiwari**

- GitHub: [github.com/aakashtiwarisolutions](https://github.com/aakashtiwarisolutions)
- LinkedIn: [linkedin.com/in/aakash-tiwari-46b6b916b](https://www.linkedin.com/in/aakash-tiwari-46b6b916b)

---

## License

MIT — see [LICENSE](./LICENSE) for details.