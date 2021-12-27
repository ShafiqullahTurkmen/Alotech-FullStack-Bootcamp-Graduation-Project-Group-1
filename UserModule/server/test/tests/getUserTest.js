const fs = require('fs');

const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const userSchema = require('../schemas/userSchema');
const { indexUrl } = require('../testConfig');
const ids = fs.readFileSync('./test/schemas/testUsers.txt').toString().split(',');

const getUserTest = describe('Get user', function() {

    it('should return 200', function(done) {
        chai.request(indexUrl)
        .get(`users/${ids[0]}`)
        .send({})
        .end(function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .get(`users/${ids[1]}`)
        .send({})
        .end(function(error, response) {
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "User found" message', function(done) {
        chai.request(indexUrl)
        .get(`users/${ids[2]}`)
        .send({})
        .end(function(error, response) {
            expect(response.body.message).to.equal("User found");
            done();
        });
    });

    it('should return user as user objects', function(done) {
        chai.request(indexUrl)
        .get(`users/${ids[3]}`)
        .send({})
        .end(function(error, response) {
            expect(response.body.user[0]).to.be.jsonSchema(userSchema);
            done();
        });
    });
});

module.exports = getUserTest;