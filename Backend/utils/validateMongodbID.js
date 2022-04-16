const mongoose = require('mongoose');

const validateMongodbId = id =>{
    // console.log(typeof(id));
    const isValid = (mongoose.Types.ObjectId.isValid(id));
    // console.log(isValid)
    if(!isValid) throw new Error("id is not  valid or found")
}
module.exports = validateMongodbId;