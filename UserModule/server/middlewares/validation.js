const { body, validationResult } = require('express-validator');
const db = require('../models');

const createUserValidation = [
    body('username', 'Username is required').notEmpty()
        .custom((value) => {
            return db.User.findOne({
                where: {
                    username: value
                }
            }).then((user) => {
                if (user) {
                    return Promise.reject('Username already exists');
                }
            });
        }),
    body('user_name', 'User name is required').notEmpty(),
    body('user_surname', 'User surname is required').notEmpty(),
    body('user_password', 'User password is required').notEmpty(),
    body('user_email', 'User email is required').notEmpty()
        .custom((value) => {
            return (db.User.findOne({
                where: {
                    user_email: value
                    }
                }).then((user) => {
                    if (user) {
                        return Promise.reject('User email already exists');
                    }
                })
            );
        }),            
    body('user_type', 'User type is required').notEmpty(),
];

const updateUserValidation = [
    body('username', 'Username is required').notEmpty(),
    body('user_name', 'User name is required').notEmpty(),
    body('user_surname', 'User surname is required').notEmpty(),
    body('user_password', 'User password is required').notEmpty(),
    body('user_email', 'User email is required').notEmpty(),
    body('user_type', 'User type is required').notEmpty(),
];


module.exports = {createUserValidation, updateUserValidation};