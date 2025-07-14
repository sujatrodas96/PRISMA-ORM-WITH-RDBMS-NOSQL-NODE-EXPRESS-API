require("dotenv").config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const { createUser, getAllUsers, getUniqueUser, loginuser, logoutUser, useredit } = require('../controller/usercontroller');
const { userauth } = require("../Middleware/authuser");
// Create User
router.post('/users', createUser);

// Get All Users
router.get('/allusers', getAllUsers);

// Get Unique Users
router.get('/users/:id', userauth, getUniqueUser);

router.post('/login', loginuser);

router.get('/logout', logoutUser);

router.patch('/edit/:id', userauth, useredit);

module.exports = router;