const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Keyfeature = require('../models/keyfeature')

module.exports = {
    login: async function({ logindata }) {

        const user = await User.findOne({ username: logindata.username });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        if (user.password !== logindata.password) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                username: user.username
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        return { token: token, userId: user._id.toString() , expiresIn:3600};
    },

    getAllKeyfeatures:async function(){
        console.log('coming')
        const keyfeatures = await Keyfeature.find();
        return {
            keyfeatures: keyfeatures.map(p => {
                return {
                    id: p._id.toString(),
                    title: p.title,
                    description: p.description,
                    icon: p.icon
                };
            })
        }
    },


    getKeyfeaturebyid:async function({id}){
        const keyfeature = await Keyfeature.findOne({_id:id});
        return {
            id: keyfeature._id.toString(),
            title: keyfeature.title,
            description: keyfeature.description,
            icon: keyfeature.icon

        }
    },


    updatekeyfeaturesbyid: async function({id,keyfeature}){
        console.log(keyfeature)
        const key_feature = await Keyfeature.findById(id);
        key_feature.title = keyfeature.title;
        key_feature.icon  = keyfeature.icon;
        key_feature.description = keyfeature.description;

        console.log(key_feature)
        const updated_key_feature = await key_feature.save();

        return {
            id: updated_key_feature._id.toString(),
            title: updated_key_feature.title,
            description: updated_key_feature.description,
            icon: updated_key_feature.icon

        }
    }
};
