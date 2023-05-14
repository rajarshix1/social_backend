const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const userMiddleware = require('./middleware/userMiddleware');
require("dotenv").config()
const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});
// app.use('/user/*', userMiddleware);
app.use('/post/create', userMiddleware);
app.use('/post/like', userMiddleware);
app.use('/post/comment', userMiddleware);
routes(app)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
