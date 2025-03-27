# School Management API Deployment Guide

## Local Deployment

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd taskApi
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   DB_HOST=sql3.freesqldatabase.com
   DB_USER=sql3769933
   DB_PASSWORD=tcLv7LRmVn
   DB_NAME=sql3769933
   ```

4. **Initialize the database**
   ```
   npm run init-db
   ```

5. **Start the server**
   ```
   npm start
   ```
   For development with auto-reload:
   ```
   npm run dev
   ```

## Production Deployment

The API is currently deployed and available at the following URL:
- Base URL: http://localhost:3000 (replace with your actual production URL if hosted)

You can deploy this API to various hosting platforms:

### Render.com
1. Sign up for a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variables in the Render dashboard
5. Deploy your application

### Railway.app
1. Sign up for a Railway account
2. Create a new project
3. Connect your GitHub repository
4. Set environment variables in the Railway dashboard
5. Deploy your application

### Heroku
1. Sign up for a Heroku account
2. Install Heroku CLI
3. Login via CLI: `heroku login`
4. Create a new app: `heroku create`
5. Set environment variables: `heroku config:set KEY=VALUE`
6. Push to Heroku: `git push heroku main`

## Database

The API uses a MySQL database hosted on freesqldatabase.com with the following credentials:
- Host: sql3.freesqldatabase.com
- Database name: sql3769933
- Database user: sql3769933
- Port number: 3306

## API Endpoints

1. **Add School**
   - Endpoint: POST /api/addSchool
   - Body: JSON object with name, address, latitude, longitude

2. **List Schools**
   - Endpoint: GET /api/listSchools?latitude=VALUE&longitude=VALUE
   - Query Parameters: latitude, longitude 