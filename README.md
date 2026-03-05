# PingMe1590GitRepo:

One QR code for your entire digital identity.

PingMe is a backend-based web application that allows users to share
everything using a single QR code. Instead of sending multiple links,
users can share one QR code that connects to all their important
information.

------------------------------------------------------------------------

## Vision

Today we manage too many links --- Instagram, LinkedIn, GitHub,
portfolio, email, and more.

PingMe keeps it simple:

One QR code. One place where everything lives.

Scan once and access: - Social profiles - Contact details - Portfolio or
GitHub - Featured projects

This project is designed for students, professionals, creators, and
networking events.

------------------------------------------------------------------------

## Current Focus

Right now, PingMe is focused on building a strong backend foundation.

The main goals are: - Building clean REST APIs - Connecting to a
database - Managing user data - Exporting data to cloud storage -
Maintaining proper Git branch workflow

Frontend and full QR features will be expanded later.

------------------------------------------------------------------------

## Tech Stack

Backend: - Node.js - Express.js - REST API structure

Database: - MongoDB (local development) - Mongoose

Cloud Integration: - AWS S3 - AWS SDK v3

Development Tools: - Nodemon - Environment variables (.env) - Git (Dev
branch workflow)

------------------------------------------------------------------------

## Core Features (Current MVP)

### User API

-   Create user profiles
-   Store user data in MongoDB
-   Retrieve user data using API

### Export to S3

-   Fetch user data from MongoDB
-   Convert the data into a .txt file
-   Upload the file to AWS S3

This shows the full flow:

Database → API → File Creation → Cloud Upload

------------------------------------------------------------------------

## How to Run

1.  Clone the repository

git clone https://github.com/aakashtiwarisolutions/PingMe1590GitRepo.git

2.  Install dependencies

npm install

3.  Create a .env file

PORT=4000 MONGO_URI=mongodb://127.0.0.1:27017/pingme
AWS_REGION=your-region AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

4.  Start the server

npm run dev

Server runs on: http://localhost:4000

------------------------------------------------------------------------

## What This Project Demonstrates

-   Backend development with Node.js
-   MongoDB database integration
-   REST API design
-   File generation in Node.js
-   Uploading files to AWS S3
-   Git branch workflow management

------------------------------------------------------------------------

## Author

Aakash Tiwari GitHub: https://github.com/aakashtiwarisolutions
