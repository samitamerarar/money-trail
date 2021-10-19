const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const shops = require("./routes/api/shops");
const transactions = require("./routes/api/transactions");
const investments = require("./routes/api/investments");
const yahooFinance = require("./routes/api/yahoo-finance");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/shops", shops);
app.use("/api/transactions", transactions);
app.use("/api/investments", investments);
app.use("/api/yahoo-finance", yahooFinance);

const port = process.env.PORT || 5000; // Heroku Port
// For heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
