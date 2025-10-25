# Uptime Monitor

A sleek, real-time dashboard to monitor the uptime of your services, designed for developers, DevOps, and IT teams.

![Dashboard Preview](imgs/image.png)

## Features

- **Monitor multiple services** (HTTP endpoints) with **pagination**
- **Real-time status updates** via WebSocket
- **Online/offline stats** with last updated timestamps
- **Add new services dynamically** from the dashboard
- **Auto-refresh** every 5 seconds (frontend backup)
- **Color-coded status badges** for quick insights
- **Responsive design** for desktop and mobile

## Tech Stack

### Frontend

- **React + TypeScript** for a responsive, modern interface
- **Lucide Icons** for clean, intuitive visuals
- Inline CSS styling with smooth hover and animation effects

### Backend

- **NestJS** for structured, scalable server-side logic
- **Axios** for HTTP requests
- **WebSocket Gateway** for real-time updates

### Databases

- **InfluxDB** – Stores time-series data for service status and historical trends
- **PostgreSQL** – Stores service metadata and configuration

This combination allows fast real-time monitoring while preserving historical logs for analytics and reporting.

## Getting Started

### Backend

1. Install dependencies:

   ```bash
   cd Backend
   npm install
   ```

2. Configure databases:
   - **InfluxDB**: set up the database for time-series status logs
   - **PostgreSQL**: set up tables for services, hosts, and user configurations

3. Start the server:

   ```bash
   npm run start:dev
   ```

4. API Endpoints:
   - `GET /site?page=<number>&limit=<number>` – Fetch services (supports pagination)
   - `POST /site` – Add a new service

### Frontend

1. Install dependencies:

   ```bash
   cd Frontend
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Features include:
   - **Service List** with paginated view
   - **Add Host** form
   - **Refresh Button** for on-demand updates
   - **Stats Grid** showing total, online, and offline counts

## Why This Stack?

- **Real-time monitoring:** WebSocket + React ensures you never miss a status change
- **Historical tracking:** InfluxDB captures precise timestamps for trends and alerts
- **Reliable service metadata:** PostgreSQL manages structured service info efficiently
- **Scalable and maintainable:** NestJS provides a clean, modular backend

## Future Improvements

- Filter services by status (online/offline)
- Export logs or service history
- Customizable refresh interval
- Authentication & role-based access control
- Alert notifications via email or Slack
