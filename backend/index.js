require('dotenv').config()
const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();


dbConnect();

const sessionConfig = {
    secret: 'sfsfwefccwrejhjk',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 180,
        maxAge: 1000 * 60 * 60 * 24 * 180
    }
}

const corsOptions = {
    origin: "http://localhost:5000",
    credentials: true,
    "Access-Control-Allow-Credentials": true
}

app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Routes
const drugRouter = require('./routes/drugs')
const adminRouter = require('./routes/admins')

app.use('/drugs', drugRouter)
app.use('/admin', adminRouter)

app.get('/', (req,res) => {
    res.json({message: "welcome"})
})


// app.get('/search', async (req, res) => {
//     try {
//         const searchQuery = req.query.search.trim();
//         const searchResult = await Drug.find({name: {$regex: new RegExp('*'+searchQuery+'.*','i')}}).exec();
//         const searchPayload = searchResult.slice(0, 10);
//         res.json({payload: searchPayload});
//     } catch {
//         console.log(err);
//         res.status(500).json({error: true, message: "internal server error"})
//     }
// })

app.get('*', (req,res) => {
    res.status(404).json({message: "sorry we can't find it"}); 
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})
