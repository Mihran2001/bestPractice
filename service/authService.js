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
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const creatUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            })
            await creatUser.save(function (err, doc) {
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

const login = async (body) => {

    const { username, password } = body;
    try {
        const user = await User.findOne({ username })
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            return user
        }
        else {
            throw new Error('Name or Password inst match')
        }
    }
    catch {
        throw "User isnt defined"
    }
}

module.exports = { register, login }