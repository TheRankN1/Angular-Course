const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const user = require('../models/userModels');
const helpers = require('../helpers/helper');
const bcrypt = require('bcrypt');
module.exports = {
    async CreateUser(req, res) {
        const schema = Joi.object().keys({
            Username : Joi.string().min(5).required(),
            Email : Joi.string().required(),
            Password : Joi.string().min(5).required()
        });
        const { error , value} = schema.validate(req.body);
        console.log(value)
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({message : error.details});
        }
        const userEmail = await user.findOne({Email : helpers.lowerCase(value.Email)})
        if(userEmail){
            return res.status(HttpStatus.CONFLICT).json({message : 'Email already exist'})
        }
        const userName = await user.findOne({Username : helpers.firstUpper(value.Username)})
        if(userName){
            return res.status(HttpStatus.CONFLICT).json({message : 'Username already exist'})
        }
        return bcrypt.hash(value.Password , 10 , (err,hash) => {
            if(err){
                return res.status(HttpStatus.BAD_REQUEST).json({message : 'Error hashing password'});
            }
            const props = {
                Username: helpers.firstUpper(value.Username),
                Email : helpers.lowerCase(value.Email),
                Password : hash
            }
            user.create(props).then(user => {
                res.status(HttpStatus.CREATED).json({message : 'Created User' , user })
            }).catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : 'Error occured'});
            })
        })
    }
};