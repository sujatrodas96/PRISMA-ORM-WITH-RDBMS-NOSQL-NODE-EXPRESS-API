require("dotenv").config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const saltRounds = 10;
const app = express();
const router = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.use("/getuser", router);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
