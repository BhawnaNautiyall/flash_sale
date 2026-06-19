# Flash Sale System

A high-concurrency flash sale platform built using Node.js, Express.js, Firebase, Cloudinary, and Redis Cloud.

The system focuses on solving inventory overselling and concurrency issues commonly found in e-commerce flash sales.

---

## Features

* Firebase Authentication
* Admin Product Upload
* Cloudinary Image Storage
* Firestore Product Management
* Redis-based Inventory Reservation
* Atomic Stock Decrement
* Automatic Inventory Rollback
* COD Order Placement
* Order History
* Responsive Product Listing

---

## Tech Stack

| Layer                | Technology            |
| -------------------- | --------------------- |
| Frontend             | HTML, CSS, JavaScript |
| Backend              | Node.js, Express.js   |
| Database             | Firestore             |
| Authentication       | Firebase Auth         |
| Image Storage        | Cloudinary            |
| Inventory Management | Redis Cloud           |

---

## Architecture

User

↓

Frontend

↓

Node.js + Express

↓

Redis Inventory Reservation

↓

Firestore Orders

↓

Cloudinary Images

---

## Product Upload Flow

Admin Upload Form

↓

Backend API

↓

Cloudinary Upload

↓

Firestore Product Creation

↓

Redis Stock Initialization

---

## Order Placement Flow

User Clicks Buy

↓

Checkout

↓

Redis DECR

↓

Stock Reserved

↓

Firestore Order Creation

↓

Success Response

---

## Inventory Rollback Mechanism

If order creation fails after stock reservation:

Redis DECR

↓

Firestore Failure

↓

Redis INCR

↓

Inventory Restored

This prevents inventory loss caused by downstream failures.

---

## Why Redis?

Traditional inventory updates using databases can become a bottleneck during flash sales.

Redis provides:

* Atomic operations
* In-memory performance
* Low latency inventory reservation
* Overselling prevention

Example:

Stock = 2

User A → DECR → 1

User B → DECR → 0

User C → DECR → -1 → Rollback → Out of Stock

Only two users successfully purchase.

---

## Concurrency Strategy

| Problem                  | Solution                       |
| ------------------------ | ------------------------------ |
| Overselling              | Redis DECR                     |
| Inventory Loss           | Rollback Mechanism             |
| Slow Database Writes     | Redis Reservation Layer        |
| High Concurrent Requests | In-Memory Inventory Management |

---

## Current Project Status

### Implemented

* Firebase Authentication
* Product Upload
* Product Listing
* Checkout
* Order Creation
* Redis Inventory Reservation
* Inventory Rollback

### Planned

* Kafka-based Asynchronous Order Processing
* Redis Rate Limiting
* Load Testing
* Deployment

---

## Folder Structure

flash_sale/

├── frontend/

├── backend/

│ ├── controllers/

│ ├── routes/

│ ├── services/

│ ├── middleware/

│ ├── config/

│ └── server.js

---

## Setup

### Backend

npm install

npm start

### Frontend

Open using Live Server

### Environment Variables

Create:

backend/.env

frontend/.env

and configure Firebase, Cloudinary, and Redis credentials.

---

## Resume Highlights

* Built a high-concurrency flash sale platform using Redis Cloud for atomic inventory reservation.
* Implemented automatic rollback mechanisms to prevent inventory loss during order processing failures.
* Designed a scalable architecture separating product metadata (Firestore) from inventory management (Redis).
