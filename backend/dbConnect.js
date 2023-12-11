const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.set('strictQuery', true)
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