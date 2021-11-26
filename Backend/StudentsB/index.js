'use strict'

const app = require("./app");
const mongoose = require("mongoose");
const port = 4300;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/StudentB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Running...");

    app.listen(port, () => {
      console.log(`Server Running in port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

