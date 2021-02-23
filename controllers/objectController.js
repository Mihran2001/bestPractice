const express = require('express')
const objectService = require('../service/objectService')

const createObject = async  (req, res) =>
{
    try {
        const obj = await objectService.createObject(req)
        res.json(obj)
    }
    catch (err) {
        throw err
    }
}

const deleteObject = async (req, res) => {
    try {
        await objectService.deleteObject(req)
        res.json({message: "Object was deleted"})
    }    
    catch (err) {
        throw err
    }
}

const editObject = async (req, res) => {
    try {
        const editedObj = await objectService.editObject(req)
        res.json (editedObj)
    }
    catch (err) {
        throw err
    }
}

const getObjects = async (req, res) => {
    try {
      const objects = await objectService.getAllObjects(req.app.locals);
      res.status(200).json(objects);
    } catch (err) {
        console.log(err)
      res.status(500).json({ errorMessage: 'server error' });
    }
  };

const getFile = async (req, res) =>
{
    res.json(req.file.filename)
}

module.exports = { createObject, deleteObject, editObject, getObjects, getFile}