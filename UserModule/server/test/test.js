const chai = require('chai');
chai.use(require('chai-json-schema'));

const getUsersTest =  require('./tests/getUsersTest');
const createUserTest = require('./tests/createUserTest');
const getUserTest = require('./tests/getUserTest');
const updateUserTest = require('./tests/updateUserTest');
const deleteUserTest = require('./tests/deleteUserTest');

describe('User Module API', function() {
   
    getUsersTest;
    createUserTest;
    getUserTest;
    updateUserTest;
    deleteUserTest;
    
});