const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config.json');
const cors = require('cors');

router.get('/verify', function(req, res, next) {
    res.json(true)
});

router.post('/upload-image', cors(), (req, res) => {
    if (!req.body.image) {
        return res.status(404).send({
            success: false,
            message: 'No file received',
        });
    } else {
        var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        const filePath = `public/user-profile/image_${new Date().toISOString()}.png`;
        require("fs").writeFile(`./${filePath}`, base64Data, 'base64', function(err) {
            if(!err){
                User.findOne({ email: req.user.email }).exec().then(function(user) {
                    user.image = filePath
                    user.save().then(function(result) {
                        res.status(200).json({
                            success: true,
                            message: 'User profile pic updated',
                            image: filePath
                        });
                    }).catch(error => {
                        res.status(500).json({
                            success: false,
                            message: error.message
                        });
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    });
                });
            }else{
                return res.status(500).send({ 
                    success: false, 
                    message: err 
                });
            }
        });
    }
});

router.post('/update', (req, res) => {
    User.findOne({ email: req.user.email }).exec().then(function(user) {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.save().then(function(result) {
            res.status(200).json({
                success: true,
                message: 'User has been updated'
            });
        }).catch(error => {
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error.message
        });
    });
});

// routes
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(function(user) {
        if(user){
            res.status(400).json({
                success: false,
                message: "User already exist"
            });
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err) {
                    return res.status(500).json({
                        success: false,
                        message: "Something wrong"
                    });
                } else {
                    const user = new User({
                        _id: new  mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash    
                    });
                    user.save().then(function(result) {
                        res.status(200).json({
                            success: true,
                            message: 'New user has been created'
                        });
                    }).catch(error => {
                        res.status(500).json({
                            success: false,
                            message: error.message
                        });
                    });
                }
            });
        }
    })
});

router.post('/authenticate', (req, res) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(function(user) {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized Access'
                    });
                }
                if(result) {
                    const { password, ...userWithoutPassword } = user.toObject()
                    const JWTToken = jwt.sign(user.toObject(), config.secret,{ expiresIn: '365d' });
                    return res.status(200).json({
                        success: true,
                        user: userWithoutPassword,
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized Access'
                });
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error.message
        });
    });;
});

module.exports = router;