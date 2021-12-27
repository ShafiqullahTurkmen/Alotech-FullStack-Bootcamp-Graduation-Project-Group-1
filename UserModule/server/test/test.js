const chai = require('chai');
chai.use(require('chai-json-schema'));

const getUsersTest =  require('./tests/getUsersTest');
const createUserTest = require('./tests/createUserTest');
const getUserTest = require('./tests/getUserTest');
const updateUserTest = require('./tests/updateUserTest');
const deleteUserTest = require('./tests/deleteUserTest');
const testCases = require('./tests/testCases');

describe('User Module API', async function() {
   
    setTimeout(async function() {
        await createUserTest;
    }, 1000);

    setTimeout(async function() {
        await getUsersTest;
    }, 1000);

    setTimeout(async function() {
        await getUserTest;
    }, 1000);

    setTimeout(async function() {
        await updateUserTest;
    }, 1000);

    setTimeout(async function() {
        await deleteUserTest;
    }, 1000);

    setTimeout(async function() {
        await testCases;
    }, 1000);
    
});