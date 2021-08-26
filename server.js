const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const shops = require("./routes/api/shops");
const transactions = require("./routes/api/transactions");
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
app.use("/api/yahoo-finance", yahooFinance);

const port = process.env.PORT || 5000; // Heroku Port
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// // Yahoo Finance
// const yahooFinance = require("yahoo-finance2").default;

// async function quote() {
//   return await yahooFinance.quote("BTC-USD").then((e) => {
//     console.log(e);
//   });
// }

// async function search() {
//   return await yahooFinance.search("BTC").then((e) => {
//     console.log(e);
//   });
// }

// quote();
// search();
