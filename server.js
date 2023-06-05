require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require('./src/routes/authRoutes');

const cors = require('cors');

const app = express();

connectDB();

//Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



// Rutas de usuario
app.use('/api/users', authRoutes);

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));