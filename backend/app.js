const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Real-time Updates
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('A user disconnected'));
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Task Tracker API!');
});

// Mount task routes under '/api/tasks' instead of '/tasks'
app.use('/api/tasks', taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
