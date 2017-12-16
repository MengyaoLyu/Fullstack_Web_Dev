const express = require('express');
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;

const app = express();

// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// });

//client id:
//client secret:
passport.use(new GoogleStategy());

const PORT = process.env.PORT || 5000;

app.listen(PORT);