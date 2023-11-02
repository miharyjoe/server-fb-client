const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 30000,
});

const userSchema = new mongoose.Schema({
  cliId: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { cliId, username, password } = req.body;

  const user = new User({
    cliId,
    username,
    password,
  });

  try {
    await user.save();
    console.log("Data saved to MongoDB");
    res.send("Data received and saved to MongoDB successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving to MongoDB");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
