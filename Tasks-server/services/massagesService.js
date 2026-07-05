 
const {getCurrentConfig} = require('./../services/configService');
const express = require('express');
const router = express.Router();
const {sendMassage } = require('./../utils/massagesUtils');
const {log, levels} =  require('./../utils/logUtils');

router.post('/send-massage',     function (req,res,next){
    log('send-massage',levels.INFORMATION);
    try {
        const { userName }= req.query;
        const {message }= req.body;
        console.log('send-massage received:', {userName, message});
        sendMassage(userName,message ) ;
        res.send(true);

    }
    catch (err){
        console.log('send-massage error:', err);
        res.status(500).send(false);
    }


})

module.exports= router

 