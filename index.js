import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import {setup} from './views.js'
// database connection
import './dbconn.js';


// routes
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/posts.routes.js';
import commentRoutes from './routes/comments.routes.js';
import likeRoutes from './routes/likes.routes.js';
import hobbiesRoutes from './routes/hobbies.routes.js';



//to use the __dirname as usual 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

setup(app); // Pass the app object to the setup function in views.js

app.listen(PORT, () => {
  console.log(`Server listening on port number ${PORT}`);
});
