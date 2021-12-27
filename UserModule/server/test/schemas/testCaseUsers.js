testUsers = {
    testUser0: {
        username: "coskun",
        user_name: "Coskun",
        user_surname: "Atak",
        user_password: "asd",
        user_email: "coskun@mail.com",
        user_type: "admin"
    },
    // No username
    testCase1: {
        user_name: 'test name',
        user_surname: 'test surname',
        user_password: 'test password',
        user_email: 'test1@mail.com',
        user_type: 'user',
    },
    // Ununique username
    testUser2: {
        username: 'coskun',
        user_name: 'test name',
        user_surname: 'test surname',
        user_password: 'test password',
        user_email: 'test2@mail.com',
        user_type: 'user',
    }
};

module.exports = testUsers;