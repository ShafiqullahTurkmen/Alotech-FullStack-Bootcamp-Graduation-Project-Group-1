// const expect = require('chai').expect;
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// const { indexUrl } = require('../testConfig');
// const testCaseUsers = require('../schemas/testCaseUsers');
// const { generateUser, access_token } = require('../schemas/testUsers');
// let username;
// let invalidEmail = 'test';

// const testCases = describe('Test cases', function() {

//     it('should create a user for test', function(done) {
//         chai.request(indexUrl)
//         .post("users")
//         .set('Content-Type', 'application/json')
//         .set(access_token)
//         .send(generateUser())
//         .end(function(error, response) {
//             expect(response.statusCode).to.equal(201);
//             username = response.body.username;
//             done();
//         });
//     });

//     it('should return 400 when bad request happens', function(done) {
//         chai.request(indexUrl)
//         .post("users")
//         .set('Content-Type', 'application/json')
//         .set(access_token)
//         .send(testCaseUsers.testUser1)
//         .end(function(error, response) {
//             expect(response.statusCode).to.equal(400);
//             done();
//         });
//     });

//     it('should return status error when bad request happens', function(done) {
//         chai.request(indexUrl)
//         .post("users")
//         .set('Content-Type', 'application/json')
//         .set(access_token)
//         .send(testCaseUsers.testUser1)
//         .end(function(error, response) {
//             expect(response.body.status).to.equal("error");
//             done();
//         });
//     });

//     it('should return error message when missing required value', function(done) {
//         chai.request(indexUrl)
//         .post("users")
//         .set('Content-Type', 'application/json')
//         .set(access_token)
//         .send(testCaseUsers.testUser1)
//         .end(function(error, response) {
//             console.log(response.body);
//             expect(response.body.message).includes("Username is required");
//             done();
//         });
//     });

//     it('should return error message when enter un-unique value', function(done) {
//         chai.request(indexUrl)
//         .post("users")
//         .set('Content-Type', 'application/json')
//         .set(access_token)
//         .send({...testCaseUsers.testUser2, username})
//         .end(function(error, response) {
//             expect(response.body.message[0]).to.equal("Username is required");
//             done();
//         });
//     });

    
//     it('should return error message when enter an invalid email', function(done) {
//         chai.request(indexUrl)
//         .post("users")
//         .set('Content-Type', 'application/json')
//         .set(access_token)
//         .send({...testCaseUsers.testUser2, invalidEmail})
//         .end(function(error, response) {
//             expect(response.statusCode).to.equal(400);
//             expect(response.body.message[0]).to.equal("Email is invalid");
//             done();
//         });
//     });
// });

// module.exports = testCases;