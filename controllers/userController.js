const express = require('express');
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const authService = require('../service/authService')

const register = async (req, res) => {
    try {
        const isRegistered = await authService.register(req)
        console.log(isRegistered)
        if (!isRegistered) {
            res.json({
                message: 'This email already exsist'
            })
        }
        else {
            res.json({
                message: 'User registered successfuly'
            })
        }
    }
    catch (err) {
        res.json(err.message)
    }
}

const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        console.log(user)
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.cookie('jwt', token, {
            httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'logined successfuly',
            username: user.username,
            userId: user._id
        })
    }
    catch(err) {
        res.json(err.message)    }
}

const signOut = (req, res) => {
    try {
      res.clearCookie('jwt');
      res.status(200).json();
    } catch (err) {
      return res.status(500).json({ errorMessage: 'server error' });
    }
  };

module.exports = { register, login, signOut }

