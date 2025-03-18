
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const postRoutes = require('./routes/posts');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Define routes
app.use('/api/posts', postRoutes); // This should come after initializing 'app'

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

// Set the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
