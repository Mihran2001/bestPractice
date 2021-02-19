const express = require('express')
const objectService = require('../service/objectService')

const creatObject = async  (req, res) =>
{
    try {
        await objectService.creatObject(req)
        res.json({message: "Object created"})
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
        await objectService.editObject(req)
        res.json ({message: "Object edited"})
    }
    catch (err) {
        throw err
    }
}

const getObjects = async (req, res) => {
    try {
      const objects = await objetService.getAllObjects(req.app.locals);
      return res.status(200).json(objects);
    } catch (err) {
      res.status(500).json({ errorMessage: 'server error' });
    }
  };

module.exports = { creatObject, deleteObject, editObject, getObjects}