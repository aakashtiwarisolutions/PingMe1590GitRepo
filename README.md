# PingMe1590GitRepo

One QR code for your entire digital identity.

PingMe is a full-stack web application that turns a single QR code into a living digital identity. Instead of sharing multiple links, users share one permanent QR code that connects people to everything they want to show.

---

## Vision

We all manage too many links: Instagram, Snapchat, GitHub, LinkedIn, portfolios, and personal projects.

PingMe keeps it simple:

> One QR code. One place where everything lives.

Scan once and instantly access:

- Social profiles
- Contact details
- Portfolio / GitHub / LinkedIn
- Promotions or featured projects

Perfect for students, creators, networking events, and professionals.

---

## Project Direction (Website-First)

As of February 2026, PingMe is being developed as a **web application first**.

The mobile app (Flutter) is still planned but will be built after the web MVP is complete.

Benefits of website-first approach:

- Faster development and testing
- No app installation required
- Works immediately when QR is scanned
- Easier deployment and iteration

---

## Tech Stack

### Frontend (Web)

- React/Next.js (planned)
- Responsive design
- QR code display and scanning support

### Backend API

- Node.js
- Express framework
- REST API architecture
- JWT authentication

### Database

- PostgreSQL
- Local development database
- AWS RDS planned for production

### Infrastructure

- AWS (EC2 / App Runner / ECS)
- Environment-based configuration
- Future CI/CD pipeline

---

## Core Features (MVP)

### Personal QR Identity

- Each user receives a permanent QR code.
- QR links to a short URL containing a unique profile ID.
- Profile content can change without updating the QR.

### Customizable Profile

- Add social links (Instagram, GitHub, LinkedIn, etc.)
- Add email, website, portfolio links
- Reorder or hide sections

### Public Profile Page

- QR directs to public web profile
- Works without requiring account login

### Privacy Controls

- Toggle visibility for individual links
- Public vs private fields

### Analytics (Planned)

- Track QR scan counts
- Basic usage statistics

---

## High-Level Architecture

1. Web Frontend
   - User signup/login
   - Profile editing
   - QR display

2. Node.js API Server (AWS)
   - Authentication
   - Profile management
   - QR resolution endpoint

3. PostgreSQL Database
   - Users
   - Links
   - Scan events

4. Public Profile URL

Example:

https://your-domain.com/p/:qrId

---

## Repository Structure

