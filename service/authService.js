const express = require('express');
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { find } = require('../models/userSchema');

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
            await creatUser.save();
            console.log("Document inserted succussfully!");
            return true
        }
    }
    catch (err) {
        throw err
    }
}

const login = async (body) => {

    const { email, password } = body;
    try {
        const user = await User.findOne({ email })
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

const profile = async () => {
    try {
        const userObjects = await User.find({createBy: locals.user.userId})
        return userObjects
    }
    catch (err) {
        throw err
    }
    
}

module.exports = { register, login, profile }