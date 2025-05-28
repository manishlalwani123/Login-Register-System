const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true
}));
app.use(cookieParser());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/authDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Register
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Username already exists" });
    }
    await User.create({ username, password });
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.cookie('auth', username, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'Lax'
  });
  res.json({ message: "Login successful", username });
});

// Check Auth
app.get('/check-auth', (req, res) => {
  const authUser = req.cookies.auth;
  res.json({ loggedIn: !!authUser, user: authUser || null });
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('auth');
  res.json({ message: "Logged out" });
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find({}, { _id: 0, username: 1, password: 1 });
  res.json(users);
});

app.listen(3000, () => console.log("Server running on port 3000"));
