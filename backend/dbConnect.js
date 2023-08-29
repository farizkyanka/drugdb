const mongoose = require('mongoose');
const DATABASE_URL = 'mongodb://127.0.0.1:27017/drugs'

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL);
    mongoose.connection.on("error", (err) => {
        console.log("error while connecting to database:" + err)
    });
    mongoose.connection.once("open", () => {
        console.log("connected to database");
    });
    mongoose.connection.on("disconnected", () => {
        console.log("mongodb connection disconnection");
    });
};

module.exports = dbConnect;