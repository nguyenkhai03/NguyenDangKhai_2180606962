const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Database connection - MongoDB Atlas
// Thay thế connection string này bằng connection string của bạn từ MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-url>/user_role_db?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Kết nối MongoDB thành công'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

// API Routes
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

// API info route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API User và Role Management',
    endpoints: {
      roles: '/api/roles',
      users: '/api/users',
      userActivation: '/api/users/activate'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});

module.exports = app;