require('dotenv').config(); // this loads the defined variables from .env

module.exports = {
    mongoURI: process.env.MONGODB_URI,
    secretOrKey: 'secret'
};
