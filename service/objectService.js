const objects = require('../models/objects')

const creatObject = async (req) => {
    try {
        const object = new objects({ ...req.body })
        const savedObj = await obj.save()

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
        const objects = await objects.find({ createdBy: locals.user._id });
        if (!objects) {
          throw Error('objects don\'t exist');
        }
        return objects;
      } catch (err) {
        throw Error(err);
      }
}


module.exports = {
    creatObject,
    deleteObject,
    editObject,
    getAllObjects
}