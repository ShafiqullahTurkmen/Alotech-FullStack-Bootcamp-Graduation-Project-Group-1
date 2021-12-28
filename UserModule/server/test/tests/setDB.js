const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require("../../models");
const sequelize = db.sequelize;

const User = require("../../models").User;

const {authUrl, access_token} = require('../testConfig');

let admin = {
    username: 'admin',
    user_name: 'admin',
    user_surname: 'admin',
    user_password: 'f703a7bd3fd781b4b8314ad13996a6fb15c650e7f4376df99c279684ffa93282',
    user_email: 'admin@mail.com',
    user_type: 'admin',
};

let tokenReq = {
    username: "admin",
    user_password: "admin",
    redirectURL: "http://localhost:3005",
}

let token = '';

const setDB = describe('Create admin and get token for tests', function() {

    it('should create admin to db if not exists', function(done) {
        sequelize
        .query("SELECT * FROM users WHERE username = :_username", { replacements: { _username: "admin" } })
        .then((v) => {
            if (v.length > 0) {
                console.log("found")
                done();
            } else {
                console.log("not found")
                User.createUser(
                    admin.username,
                    admin.user_name,
                    admin.user_surname,
                    admin.user_password,
                    admin.user_email,
                    admin.user_type,
                )
                .then(() => {
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
            }
        })
    });

    it('should create token', function(done) {
        chai.request(authUrl)
        .post("auth")
        .send(tokenReq)
        .end(function(error, response) {
            token = response.body.token;
            access_token['access_token'] = token;
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

});

module.exports = setDB;