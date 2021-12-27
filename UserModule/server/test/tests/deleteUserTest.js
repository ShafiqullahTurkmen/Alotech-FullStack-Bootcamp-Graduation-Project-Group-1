const fs = require('fs');

const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { indexUrl } = require('../testConfig');
const ids = fs.readFileSync('./test/schemas/testUsers.txt').toString().split(',');

const deleteUserTest = describe('Delete user', function() {

    it('should return 200', function(done) {
        chai.request(indexUrl)
        .delete(`users/${ids[0]}`)
        .send({})
        .end(function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return status success', function(done) {
        chai.request(indexUrl)
        .delete(`users/${ids[1]}`)
        .send({})
        .end(function(error, response) {
            // Response body status should be success
            expect(response.body.status).to.equal("success");
            done();
        });
    });

    it('should return "User deleted" message', function(done) {
        chai.request(indexUrl)
        .delete(`users/${ids[2]}`)
        .send({})
        .end(function(error, response) {
            expect(response.body.message).to.equal("User deleted");
            done();
        });
    });
});

module.exports = deleteUserTest;