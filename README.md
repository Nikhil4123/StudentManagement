# School Management API

A Node.js API for managing school data, allowing users to add schools and retrieve them sorted by proximity to a specific location.

## Features

- Add new schools with name, address, and geographic coordinates
- List all schools sorted by proximity to a user-specified location
- Distance calculation using the Haversine formula

## Technologies Used

- Node.js
- Express.js
- MySQL
- Cors for cross-origin requests
- Dotenv for environment variable management

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd taskApi
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   ```

4. Initialize the database and create tables:
   ```
   npm run init-db
   ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

## API Endpoints

### Add School
- **URL**: `/api/addSchool`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Sample School",
    "address": "123 Education St",
    "latitude": 34.0522,
    "longitude": -118.2437
  }
  ```
- **Success Response**: 
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": {
      "id": 1,
      "name": "Sample School",
      "address": "123 Education St",
      "latitude": 34.0522,
      "longitude": -118.2437
    }
  }
  ```

### List Schools by Proximity
- **URL**: `/api/listSchools?latitude=34.0522&longitude=-118.2437`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Success Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "id": 1,
        "name": "Nearest School",
        "address": "123 Education St",
        "latitude": 34.0522,
        "longitude": -118.2437,
        "created_at": "2023-06-01T12:00:00.000Z",
        "distance": 0
      },
      {
        "id": 2,
        "name": "Farther School",
        "address": "456 Learning Ave",
        "latitude": 34.1000,
        "longitude": -118.3000,
        "created_at": "2023-06-01T12:30:00.000Z",
        "distance": 7.12
      }
    ]
  }
  ```

## Postman Collection

You can import the Postman collection from the `School Management API.postman_collection.json` file in this repository for testing the API endpoints. 