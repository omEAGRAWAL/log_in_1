const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // For password hashing
const port = 9002;
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: ["https://login.om.kotty.net"],
    methods: ["GET", "POST"],
    credentials: true,
  })
); // Restrict CORS in production

// Replace with environment variables or a secure configuration file
const dbUrl =
  "mongodb+srv://Omagr:Password@cluster0.mfa3wse.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "UserData");

// Validate email format
function validateEmail(email) {
  // Use a more robust validation library in production
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

// Validate required fields
function validateRegistration(body) {
  const { name, email, password } = body;
  return name && email && password && validateEmail(email);
}

// Register user
app.post("/register", async (req, res) => {
  try {
    if (!validateRegistration(req.body)) {
      return res.status(400).send({ message: "Invalid registration data" });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Use more rounds in production

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send({ message: "Registration failed" });
  }
});

// Implement login functionality with proper authentication
app.post("/login", async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Compare password hashes (use bcryptjs from `bcrypt` package)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Login successful, generate a JWT token (implement authentication logic here

    // const token = /* generate JWT token using a suitable library or function */;
    res.send({ message: "passes  jjjndjnnd" });
    console.log("sucseelfully login");
    console.log("user", user);

    // Send the token in the response
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send({ message: "An error occurred" });
  }
});
app.listen(3001, () => {
  console.log(`Server listening on port ${port}`);
});
