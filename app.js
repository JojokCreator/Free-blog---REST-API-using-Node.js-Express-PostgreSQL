import express from "express";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js"
import authRouter from "./routes/auth.js"
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.port || 3000;

app.use(express.static('public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

// test route
app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "Test route up and running!",
  });
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

