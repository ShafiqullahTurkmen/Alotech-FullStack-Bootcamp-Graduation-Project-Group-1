const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { indexUrl } = require('../testConfig');
const testCaseUsers = require('../schemas/testCaseUsers');

const testCases = describe('Create user test cases', function() {

    it('should return 400', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testCaseUsers.testUser1)
        .end(function(error, response) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('should return status error', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testCaseUsers.testUser1)
        .end(function(error, response) {
            expect(response.body.status).to.equal("error");
            done();
        });
    });

    it('should return error message when missing required value', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testCaseUsers.testUser1)
        .end(function(error, response) {
            expect(response.body.message).includes("Username is required");
            done();
        });
    });

    it('should return error message when enter un-unique value', function(done) {
        chai.request(indexUrl)
        .post("users")
        .send(testCaseUsers.testUser2)
        .end(function(error, response) {
            expect(response.body.message).includes("Username already exists");
            done();
        });
    });
});

module.exports = testCases;