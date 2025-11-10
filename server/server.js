const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory user storage
const users = new Map();

// Pre-load test accounts
users.set('testuser1@example.com', {
  email: 'testuser1@example.com',
  password: hashPassword('passwordTest1'),
  accountTier: 'free',
  createdAt: new Date().toISOString()
});

users.set('testuser2@example.com', {
  email: 'testuser2@example.com',
  password: hashPassword('passwordTest2'),
  accountTier: 'pro',
  createdAt: new Date().toISOString()
});

// Simple password hashing function (using crypto)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password && password.length >= 8;
}

function validateAccountTier(tier) {
  return ['free', 'pro'].includes(tier);
}

// Root endpoint
app.get('/', function(req, res) {
  res.send('Authentication API Server - Endpoints: POST /api/register, POST /api/login');
});

// Existing enroll endpoint
app.post('/enroll', function(req, res) {
  console.log(req.body);
  res.status(200).send({"message": "Data received"});
});

// Registration endpoint
app.post('/api/register', function(req, res) {
  const { email, password, accountTier } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
      field: !email ? 'email' : 'password'
    });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email format',
      field: 'email'
    });
  }
  
  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long',
      field: 'password'
    });
  }
  
  if (accountTier && !validateAccountTier(accountTier)) {
    return res.status(400).json({
      error: 'Invalid account tier. Must be "free" or "pro"',
      field: 'accountTier'
    });
  }
  
  // Check if user already exists
  if (users.has(email.toLowerCase())) {
    return res.status(409).json({
      error: 'User with this email already exists',
      field: 'email'
    });
  }
  
  // Create new user
  const newUser = {
    email: email.toLowerCase(),
    password: hashPassword(password),
    accountTier: accountTier || 'free',
    createdAt: new Date().toISOString()
  };
  
  users.set(email.toLowerCase(), newUser);
  
  console.log(`[REGISTER] New user registered: ${email} (${newUser.accountTier})`);
  
  // Return success (don't send password back)
  res.status(201).json({
    message: 'Registration successful',
    user: {
      email: newUser.email,
      accountTier: newUser.accountTier,
      createdAt: newUser.createdAt
    }
  });
});

// Login endpoint
app.post('/api/login', function(req, res) {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
      field: !email ? 'email' : 'password'
    });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email format',
      field: 'email'
    });
  }
  
  // Check if user exists
  const user = users.get(email.toLowerCase());
  
  if (!user) {
    return res.status(401).json({
      error: 'Invalid email or password',
      field: 'credentials'
    });
  }
  
  // Verify password
  const hashedPassword = hashPassword(password);
  
  if (user.password !== hashedPassword) {
    return res.status(401).json({
      error: 'Invalid email or password',
      field: 'credentials'
    });
  }
  
  console.log(`[LOGIN] User logged in: ${email} (${user.accountTier})`);
  
  // Return success (don't send password back)
  res.status(200).json({
    message: 'Login successful',
    user: {
      email: user.email,
      accountTier: user.accountTier,
      createdAt: user.createdAt
    }
  });
});

// Get all users endpoint (for testing purposes)
app.get('/api/users', function(req, res) {
  const userList = Array.from(users.values()).map(user => ({
    email: user.email,
    accountTier: user.accountTier,
    createdAt: user.createdAt
  }));
  
  res.status(200).json({
    count: userList.length,
    users: userList
  });
});

// Health check endpoint
app.get('/api/health', function(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    usersCount: users.size
  });
});

app.listen(PORT, function(){
  console.log("Server running on localhost:" + PORT);
  console.log("Test accounts loaded:");
  console.log("  - testuser1@example.com (Free tier)");
  console.log("  - testuser2@example.com (Pro account)");
});