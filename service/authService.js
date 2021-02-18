const express = require('express');
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const register = async (req) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return false
        }
        else {
            const creatUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            await creatUser.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted succussfully!");
              })
            return true
        }
    }
    catch (err) {
        throw err
    }
}

const login = async (req) => {

    const { email, password } = req;
    
    try {
        const user = await User.findOne({ email })
        if (user)
        {
            const isMatch = bcrypt.compare(password, user.password)
            if (isMatch) {
                return user
            }
            else {
                throw new Error('Name or Password inst match')
            }
        }
        else
        {
            throw new Error('Name is not exsist')
        }
    }
    catch(err)
    {
        throw new Error(err)
    }
}

module.exports = { register, login }