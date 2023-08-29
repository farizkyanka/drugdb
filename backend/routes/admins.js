const express = require('express');
const router = express.Router();
const Admin = require('../models/admins');
const passport = require('passport');


router.get('/login', (req,res) => {
    res.send('welcome')
})


router.delete('logout', (req,res) => {
    
})

module.exports = router;