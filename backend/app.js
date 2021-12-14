require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected ✅ ');
  })
  .catch(() => {
    console.log('MongoDB error ❌');
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
