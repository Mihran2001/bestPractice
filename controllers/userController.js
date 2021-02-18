const express = require('express');
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const authService = require('../service/authService')

const register = async (req, res) => {
    try {
        const isRegistered = await authService.register(req)
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
        console.log(err)
    }
}

const login = async (req, res) => {
    try {
        const user = authService.login(req.body);
        const token = await jwtService.signToken(user);

        res.cookie('jwt', token, {
            httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            username: user.username,
            userId: user._id
        })
    }
    catch {
        return res.status(500).json({ errorMessage: 'server error' });
    }
}

module.exports = { register, login }

