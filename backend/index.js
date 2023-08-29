require('dotenv').config()
const express = require('express');
const dbConnect = require('./dbConnect');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = require('./models/admin')

const app = express();

const drugRouter = require('./routes/drugs')
const adminRouter = require('./routes/admin')

dbConnect();

const sessionConfig = {
    secret: 'non ono no no non  no',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24 
    }
}

const corsOptions = {
    origin: "http://localhost:5000",
    credentials: true,
    "Access-Control-Allow-Credentials": true
}

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session(sessionConfig));

// Authentication

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


// Routes
app.use('/admin', adminRouter)
app.use('/drugs', drugRouter)



app.get('/', (req,res) => {
    res.json({message: "welcome"})
})


// Remaining catch all express methods
app.get('*', (req,res) => {
    res.status(404).json({message: "sorry we can't find it"}); 
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})
