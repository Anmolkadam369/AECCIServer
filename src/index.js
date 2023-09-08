const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors")
require('dotenv').config();
const port = process.env.PORT || 3001;
const router = require("./routes/route");
mongoose.set("strictQuery", true);
const app = express();

app.use(express.json());
app.use(multer().any());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://developeraecci:ubMS9OYuN1aWxufO@webdevelopercluster.b5xh3hf.mongodb.net/test",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

 app.use("/", router);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const port = process.env.PORT || 3000;
// const route = require("./routes/route");
// mongoose.set("strictQuery", true);
// const app = express();
// app.use(express.json());
// app.use(multer().any());
// mongoose.connect("mongodb+srv://developeraecci:ubMS9OYuN1aWxufO@webdevelopercluster.b5xh3hf.mongodb.net/test")
//   .then(() => {
//     console.log("mongoDB is connected");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.use("/", route);

// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });