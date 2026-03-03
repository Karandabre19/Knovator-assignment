# Knovator Assignment - Job Import Dashboard

This project is a full-stack assignment where we import jobs from an XML feed, process them in batches using a queue, store/update them in MongoDB, and show import history on an admin dashboard. For the env, I have put the in the middle of this fill

## What We Have Built

Here is what is done end-to-end:

1. Backend API with Express.
2. Feed parsing service using `axios + xml2js`.
3. Queue-based batch processing using `BullMQ + Redis`.
4. Worker that upserts jobs into MongoDB (`new` vs `updated` tracking).
5. Import run tracking (`ImportRun`) while batches are processing.
6. Final import logs (`ImportLog`) once all batches complete.
7. Hourly cron import (`node-cron`) for automatic sync.
8. Next.js admin UI to:
   - Trigger manual import
   - View paginated import logs
   - See loading state during import/log fetch

## Tech Stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui
- Backend: Node.js, Express 5, Mongoose
- Queue/Workers: BullMQ, Redis
- Data Source: Jobicy XML job feed

## Project Structure

Knovator-Assignment/
client/ -> Next.js admin dashboard
server/ -> Express API, queue, workers, cron, Mongo models

## Setup Guide (Complete)

## 1) Prerequisites

Make sure you have:

- Node.js (v18+ recommended)
- npm
- pnpm (for client)
- MongoDB (local or Atlas)
- Redis (local or cloud)

## 2) Install Dependencies

From project root:

```bash
cd server
npm install

cd ../client
pnpm install
```

## 3) Configure Environment (Server)

Create `server/.env` and add:

PORT=5021
NODE_ENV=development
DB_URI=your_mongodb_connection_string

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

BATCH_SIZE=1000
WORKER_CONCURRENCY=5
LOCAL_SERVER_URL=http://localhost:5021

Notes:

- `BATCH_SIZE` controls how many jobs go in one queue batch.
- `WORKER_CONCURRENCY` controls parallel job processing in worker.

## 4) Start Backend

```bash
cd server
npm run dev
```

Backend starts on `http://localhost:5021` and loads:

- Express app
- Queue worker
- Hourly cron schedule

## 5) Start Frontend

```bash
cd client
pnpm dev
```

Frontend runs on `http://localhost:3000`.

## 6) Use the App

Open `http://localhost:3000`:

1. Click **Trigger Import** to start a manual import.
2. Watch import logs table update with:
   - Total fetched
   - New jobs
   - Updated jobs
   - Failed jobs
3. Use Previous/Next buttons for pagination.

## API Endpoints

- `GET /api/import`
  - Triggers manual import for `data-science` feed and queues batches.

- `GET /api/import-logs?page=1&limit=10`
  - Returns paginated import history.

## Those are the Env which you need to Inject :

REDIS_HOST=redis-11297.crce217.ap-south-1-1.ec2.cloud.redislabs.com
REDIS_PORT=11297
REDIS_PASSWORD=UWf4UPGB58SPnbs9h562FYJO575htTBp
BATCH_SIZE=1000
WORKER_CONCURRENCY=10
NODE_ENV=Development
PORT=5021
LOCAL_SERVER_URL = http://localhost:5021
DB_URI=mongodb+srv://karandabre198_db_user:Karan13288@job-board-cluster.e0te3jh.mongodb.net/?appName=Job-Board-cluster

## How Import Processing Works

1. Feed is fetched and parsed.
2. A run record is created in `ImportRun`.
3. Jobs are split into batches (`BATCH_SIZE`) and pushed to BullMQ queue.
4. Worker processes each batch:
   - Insert new jobs
   - Update existing jobs by `externalId`
5. Worker updates run stats after every batch.
6. When all batches are processed:
   - Final log is saved in `ImportLog`
   - Temporary `ImportRun` entry is removed

## Current Scope

This assignment currently focuses on:

- Reliable job import pipeline
- Queue + worker based processing
- Tracking import outcomes
- Simple admin visibility via dashboard

No auth and no automated tests are included yet.
