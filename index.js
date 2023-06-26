const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// database connection
require('./dbconn');
const views = require('./views'); // Import the views module

// routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/posts.routes');
const commentRoutes = require('./routes/comments.routes');
const likeRoutes = require('./routes/likes.routes');
const hobbiesRoutes = require('./routes/hobbies.routes');

const app = express();
const PORT = 3000;

// configuring the public directory
const publicDirPath = path.join(__dirname, '/public');
app.use(express.static(publicDirPath));

// use of middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(likeRoutes);
app.use(hobbiesRoutes);

// enabling CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

views.setup(app); // Pass the app object to the setup function in views.js

app.listen(PORT, () => {
  console.log(`Server listening on port number ${PORT}`);
});
