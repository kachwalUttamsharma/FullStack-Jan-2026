const express = require('express');
const app = express();
const port = 3000;
const moviesRoute = require("./src/routes/moviesRoute");
const notFoundMiddleware = require("./src/middleware/notFoundMiddleware");
const errorMiddleware = require('./src/middleware/errorMiddleware');
const loggerMiddleware = require("./src/middleware/loggerMiddleware");

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/v1/movies", moviesRoute);



// if above route doesnt match it handle errors
app.use(notFoundMiddleware)

// error handling middleware
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});