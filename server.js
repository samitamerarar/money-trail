const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const shops = require('./routes/api/shops');
const transactions = require('./routes/api/transactions');
const investments = require('./routes/api/investments');
const yahooFinance = require('./routes/api/yahoo-finance');

// ** MIDDLEWARE ** //
const welcomelist = [
    'http://localhost:3000/',
    'http://localhost:8080/',
    'https://my-money-trail.herokuapp.com',
    'https://moneytrail.pro',
    'https://samitamerarar.github.io'
];
const corsOptions = {
    origin: function (origin, callback) {
        console.log('** Origin of request ' + origin);
        if (welcomelist.indexOf(origin) !== -1 || !origin) {
            console.log('Origin acceptable');
            callback(null, true);
        } else {
            console.log('Origin rejected');
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/shops', shops);
app.use('/api/transactions', transactions);
app.use('/api/investments', investments);
app.use('/api/yahoo-finance', yahooFinance);

// For Heroku
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const port = process.env.PORT || 8080; // Heroku Port
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
