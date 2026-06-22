const express = require("express");
const app = express();
const port = 3000;

// global level middleware (it parser incoming request body into json)
app.use(express.json());

// Logger Middleware
function logger(req,res,next) {
    console.log("Logger Middleware");
    console.log("Method : ", req.method);
    next();
}


// timestamp middleware
function addTime(req, res, next) {
  console.log('Timestamp Middleware');

  req.requestTime = new Date().toLocaleString();

  next();
}

function auth(req, res, next) {
  console.log('Authentication Middleware');

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'Token missing',
    });
  }

  next()
}

// registering logger middleware
app.use(logger);
app.use(addTime);

app.get("/", (req, res) => {
    console.log("Route Handler");

    res.send({
        success: true,
        message: "Welcome to server",
        time: req.requestTime
    })
})

app.get("/profile", auth, (req, res) => {
    console.log("Route Handler");
    res.send({
        success: true,
        message: "Profile fetched successfully",
        user: req.user,
        requestTime: req.requestTime
    })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});