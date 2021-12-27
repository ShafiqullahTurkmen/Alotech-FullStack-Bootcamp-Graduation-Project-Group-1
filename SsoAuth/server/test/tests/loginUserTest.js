const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const testUsers = require('../schemas/testUsers');
const tokenSchema = require('../schemas/tokenSchema');
const { indexUrl } = require('../testConfig');


const loginUserTest = describe('Login user', function() {

    it('should return auth as true', function(done) {
        chai.request(indexUrl)
        .post("")
        .send(testUsers.testUser1)
        .end(function(error, response) {
            expect(response.body.auth).to.be.true;
            done();
        });
    });

    it('should return success message', function(done) {
        chai.request(indexUrl)
        .post("")
        .send(testUsers.testUser2)
        .end(function(error, response) {
            expect(response.body.msg).to.equal("login success");
            done();
        });
    });

    it('should return user id', function(done) {
        chai.request(indexUrl)
        .post("")
        .send(testUsers.testUser3)
        .end(function(error, response) {
            expect(response.body.user_id).to.equal(testUsers.testUser3.id);
            done();
        });
    });

    it('should return token as token object', function(done) {
        chai.request(indexUrl)
        .post("")
        .send(testUsers.testUser4)
        .end(function(error, response) {
            expect(response.body.token).to.be.jsonSchema(tokenSchema);
            done();
        });
    });
});

module.exports = loginUserTest;