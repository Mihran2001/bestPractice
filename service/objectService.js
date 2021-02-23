const objects = require('../models/objects')
const fs = require('fs')

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

const findObj = (obj, key, value) => {
    const result = [];
    const recursiveSearch = (obj) => {
      if (!obj || typeof obj !== 'object') {
        return;
      }
      if (obj[key] === value) {
        result.push(obj);
      }
      Object.keys(obj).forEach(function (k) {
        recursiveSearch(obj[k]);
      });
    };
    recursiveSearch(obj);
    return result;
  };

const createObject = async (req) => {
    try {
         const objs = req.body.name;
          const files = findObj(objs, '__type', '__file');
          files.forEach((file) => {
                const filename = file.fileName
                if (fs.existsSync(`./uploads/${filename}`)) {
                  fs.rename(`./uploads/${filename}`, `./uploadsFinal/${filename}`, function (err) {
                    if (err) {
                      throw new Error(err);
                    }
                  });
                }
              });

        const object = new objects({
            name: req.body.name,
            createdBy: req.app.locals.user._id
        })
        const savedObj = await object.save()

        return  savedObj
    }
    catch (err) {
        throw err
    }
}

const getAllObjects = async (locals) => {
    try {
        const obj = await objects.find({ createdBy: locals.user._id });
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