# React & Express Starter Project

This is a project for Ubt Lab Course II, a crowd-sourced news platform. The project is structured with two main folders:

- `client/` - Contains the React application.
- `server/` - Contains the Express backend.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)
- PostgreSQL (Ensure the database service is running)

#### Database Configuration

Ensure you have a PostgreSQL database set up with the following configuration:

```json
{
    "username": "postgres",
    "password": "1234",
    "database": "LabCourseII",
    "host": "localhost",
    "dialect": "postgres"
}
```

## Installation

#### 1. Clone the Repository

```sh
git clone https://github.com/dion04/LabKurs-II-Project.git
cd LabKurs-II-Project
```

#### 2. Install Dependencies

##### Install server dependencies

```sh
cd server
npm install
```

##### Install client dependencies

```sh
cd ../client
npm install
```

## Running the Project

### Start the Backend (Express Server)

```sh
cd server
npm run dev
```

This starts the Express server on `http://localhost:8080` (default port, can be changed in `.env` or `server/index.js`).

### Start the Frontend (React App)

```sh
cd client
npm run dev
```

This starts the React development server on `http://localhost:5137`.

## Project Structure

```
/
├── client/    # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/    # Express backend
│   ├── src/
│   ├── package.json
│   ├── server.js
│   └── ...
│
├── README.md  # Project documentation
└── .gitignore
```

