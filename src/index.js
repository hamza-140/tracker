require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireRoutes = require("./middlewares/requireAuth");
const requireAuth = require("./middlewares/requireAuth");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authRoutes);
app.use(trackRoutes);
const mongoUri =
  "mongodb+srv://hamza-140:Hamza345@lama.hjk6a6p.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB: ", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
