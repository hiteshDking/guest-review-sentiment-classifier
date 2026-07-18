# Guest Review Sentiment Classifier Backend

## Technology Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Database

MongoDB Atlas is used because it is cloud-based, free for small projects, and integrates easily with Express and Mongoose.

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

3. Run the backend

```bash
node server.js
```

The server runs on:

```
http://localhost:5000
```

## API Endpoints

GET /api/reviews

GET /api/reviews/:id

POST /api/reviews

PUT /api/reviews/:id

DELETE /api/reviews/:id

GET /api/reviews/search/:text