require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
