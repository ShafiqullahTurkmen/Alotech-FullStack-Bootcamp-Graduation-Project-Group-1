const fs = require('fs');

const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const userSchema = require('../schemas/userSchema');
const testUsers = require('../schemas/testUsers');
const { indexUrl } = require('../testConfig');
const ids = fs.readFileSync('./test/schemas/testUsers.txt').toString().split(',');

const updateUserTest = describe('Update user', function() {

    it('should return 200', function(done) {
        chai.request(indexUrl)
        .put(`users/${ids[0]}`)
        .send(testUsers.testUser1)
        .end(function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .put(`users/${ids[1]}`)
        .send(testUsers.testUser2)
        .end(function(error, response) {
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "User updated" message', function(done) {
        chai.request(indexUrl)
        .put(`users/${ids[2]}`)
        .send(testUsers.testUser3)
        .end(function(error, response) {
            expect(response.body.message).to.equal("User updated");
            done();
        });
    });

    it('should return user as user objects', function(done) {
        chai.request(indexUrl)
        .put(`users/${ids[3]}`)
        .send(testUsers.testUser4)
        .end(function(error, response) {
            expect(response.body.user).to.be.jsonSchema(userSchema);
            done();
        });
    });
});

module.exports = updateUserTest;