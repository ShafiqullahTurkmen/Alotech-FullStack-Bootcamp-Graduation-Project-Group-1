const chai = require('chai');
chai.use(require('chai-json-schema'));

const loginUserTest = require('./tests/loginUserTest');

describe('Auth API', function() {
   
    loginUserTest;
    
});

// describe('Validation API', function() {     
// });