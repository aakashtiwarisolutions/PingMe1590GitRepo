# PingMe1590GitRepo
One QR code for your entire digital identity, PingMe (Flutter + Node.js + PostgreSQL + AWS).”


**PingMe** is a full-stack app that turns a single QR code into a living digital identity.

Each user gets a personal QR that can go on a phone case, T-shirt, badge, card: even a tattoo if they’re brave enough. The QR never changes, but the profile behind it is fully editable: socials, email, portfolio, promos, and anything else worth sharing.

---

## Vision

We all have too many links: Instagram, Snapchat, GitHub, LinkedIn, portfolios, discount codes, and random side projects.

PingMe keeps it simple:

> **One QR code. One place where everything lives.**

Scan it and you get exactly what the person wants you to see:
- Social profiles  
- Contact details  
- Portfolio / GitHub / LinkedIn  
- Promotions, referral links, or featured projects  

Perfect for students, creators, event networking, or anyone who’s tired of saying  
“Hold on, let me find my link…”

---

## Tech Stack

**Mobile App**
- Flutter (Dart)
- REST API client
- QR code generator + scanner
- Secure storage for auth tokens

**Backend API**
- Node.js
- Express (or similar framework)
- JWT authentication
- Input validation and error handling

**Database**
- PostgreSQL
- Migrations (e.g. Knex / Prisma / Sequelize)

**Infrastructure**
- AWS for server and deployment (e.g. EC2 / App Runner / ECS)
- AWS RDS for PostgreSQL (planned)
- Environment, based configuration for dev vs prod

---

## Core Features (MVP)

- **Personal QR Identity**
  - Each user gets a unique, permanent QR code.
  - QR encodes a short URL / ID, not the full data, so the same QR keeps working even when the profile changes.

- **Customizable Profile**
  - Add social links (Instagram, Snapchat, TikTok, etc.).
  - Add email, website, portfolio, GitHub, LinkedIn.
  - Add promotions, referral links, or featured projects.
  - Reorder or hide sections whenever you like.

- **Built-in QR Scanner**
  - Scan any PingMe QR directly in the app.
  - Non-users can still scan with the normal camera and see a public web profile.

- **Privacy Controls**
  - Toggle visibility for email, phone, and each link.
  - Future: modes for public / friends-only / private.

- **Light Analytics (planned)**
  - Count of how many times your QR was scanned.
  - Simple stats by day / week / month.

---

## High-Level Architecture

1. **Flutter Mobile App**
   - Handles registration, login, profile editing.
   - Renders the user’s QR code.
   - Offers a camera view for scanning other QR codes.

2. **Node.js API Server (on AWS)**
   - Exposes REST endpoints for auth, profile, links, and stats.
   - Resolves QR IDs to public profiles when someone scans.
   - Uses environment variables for DB connection, JWT secret, and base URLs.

3. **PostgreSQL Database**
   - Stores users, links, and (optionally) scan events.
   - Hosted locally in dev; on AWS RDS in production.

4. **Public Profile URL**
   - QR points to something like: `https://your-domain.com/p/:qrId`
   - Backend returns a lightweight profile page (web) or JSON (for the app).

---

## Data Model (Draft)

**users**
- `id` (UUID)
- `email`
- `password_hash` or external auth provider id
- `name`
- `bio`
- `qr_id` (short unique string used in QR URL)
- `created_at`
- `updated_at`

**links**
- `id`
- `user_id` (FK → users.id)
- `type` (`instagram`, `github`, `email`, `custom`, etc.)
- `label` (e.g. `"My Instagram"`, `"Portfolio"`)
- `value` (URL or handle / email)
- `is_visible` (boolean)
- `order_index` (for sorting)

**scan_events** (optional)
- `id`
- `user_id`
- `scanned_at`

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aakashtiwarisolutions/PingMe1590GitRepo
cd PingMe1590GitRepo
```

Assumed structure:

```text
PingMe1590GitRepo/
  backend/
  mobile/
```

---

### 2. Backend Setup (Node.js + PostgreSQL)

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=4000
DATABASE_URL=postgres://username:password@localhost:5432/pingme
JWT_SECRET=change_this_to_a_long_random_string
BASE_PUBLIC_URL=https://localhost:4000
```

> For AWS deployment, these values will come from environment variables in your AWS service (e.g. App Runner / ECS / EC2).

Run migrations (example command, depending on the tooling you choose):

```bash
npm run migrate
```

Start the dev server:

```bash
npm run dev
# or
npm start
```

API should be available at: `http://localhost:4000`.

---

### 3. Mobile App Setup (Flutter)

```bash
cd ../mobile
flutter pub get
```

Update the API base URL in your Flutter config:

```dart
const String apiBaseUrl = 'http://10.0.2.2:4000'; // Android emulator
// or your machine IP for real devices, or your AWS public URL in production
```

Run the app:

```bash
flutter run
```

You should now be able to:

1. Sign up / log in.  
2. Edit your profile (name, bio, links).  
3. See your own QR code.  
4. Scan another test user’s QR and view their profile.

---

## API Sketch

These endpoints may evolve, but the basic idea is:

**Auth**
- `POST /auth/signup`
- `POST /auth/login`

**Current User**
- `GET /me`
- `PUT /me` – update name, bio, avatar, etc.

**Links**
- `GET /me/links`
- `POST /me/links`
- `PUT /me/links/:id`
- `DELETE /me/links/:id`

**Public Profile**
- `GET /p/:qrId` – returns public profile data for the scanned QR.

**Analytics (planned)**
- `GET /me/stats`

---

## Roadmap

- Theming and layout options for public profiles.
- Friends / connections inside the app.
- NFC card support (tap instead of scan).
- Time-limited “highlight” section for promos.
- Admin panel for abuse reporting and moderation.
- Full AWS deployment: API + RDS + CI/CD pipeline.

---

## License

This project is planned to be released under the **MIT License**.  
(Once the LICENSE file is added, it will apply to this repository.)

---

## Status

This is an active learning + portfolio project that could grow into something bigger.  
If you’re reading this on GitHub and have ideas, feel free to open an issue or drop a suggestion.
