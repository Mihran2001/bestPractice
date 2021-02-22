const objects = require('../models/objects')

const createObject = async (req) => {
    try {
        console.log(123)
        // const object = new objects({ ...req.body, createdBy: req.locals.user._id })
        const object = new objects({
            name: req.body.name,
            createdBy: req.app.locals.user._id
        })
        console.log(object)
        const savedObj = await object.save()

        return  savedObj
    }
    catch (err) {
        throw err
    }
}

const deleteObject = async (req) => 
{
    try {
        let result = await	objects.deleteOne({createdBy: req.body.createdBy})
        return true
    }
    catch (err) {
        throw err
    }
}

const editObject = async (req) => {
    try {
        let deleted = await	objects.deleteOne({_id: req.body._id});
        const edited = new objects({...req.body});
        const saveEditedObj = await edited.save();
        return saveEditedObj;
    }
    catch (err) {
        throw err
    }
}

const getAllObjects = async (locals) => {
    try {
        const obj = await objects.find({ createdBy: locals.user._id });
        // console.log(objects)
        return obj;
      } catch (err) {
        throw Error(err);
      }
}


module.exports = {
    createObject,
    deleteObject,
    editObject,
    getAllObjects
}