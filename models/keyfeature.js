const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keyfeatureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Keyfeature', keyfeatureSchema);
