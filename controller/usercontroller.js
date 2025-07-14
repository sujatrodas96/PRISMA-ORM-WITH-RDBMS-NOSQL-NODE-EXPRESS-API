require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Fetch full user (including password)
    const userWithPassword = await prisma.user.findUnique({
      where: { email },
    });

    if (!userWithPassword) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Step 2: Compare passwords
    const isPasswordValid = await bcrypt.compare(password, userWithPassword.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Step 3: Generate JWT token
    const token = jwt.sign(
      { id: userWithPassword.id, email: userWithPassword.email },
      process.env.TOKEN, // your JWT secret
      { expiresIn: '1h' }
    );

    // Step 4: Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      maxAge: 1 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
    });

    // Step 5: Return user (excluding password)
    const { id, name, email: userEmail, createdAt, updatedAt } = userWithPassword;
    const user = { id, name, email: userEmail, createdAt, updatedAt };

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUniqueUser = async (req, res) => {
  try { 

    const userId = req.params.id;
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const useredit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      data: { name, email },
    });

    // Check for email mismatch and respond immediately
    if (updatedUser.email !== req.user.email) {
      res.clearCookie('token');
      return res.status(200).json({
        message: 'Due to email change, you have been logged out. Please login again with new email.',
        updatedUser,
      });
    }

    // If no email change, proceed with normal response
    return res.status(200).json({
      message: 'Update Successfully',
      updatedUser,
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  try { 

    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUniqueUser,
  loginuser,
  logoutUser,
  useredit
};