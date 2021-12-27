testUsers = {
    testUser0: {
        username: "admin",
        user_name: "admin",
        user_surname: "admin",
        user_password: "admin",
        user_email: "admin@mail.com",
        user_type: "admin"
    },
    // No username
    testCase1: {
        user_name: 'admin 2',
        user_surname: 'test surname',
        user_password: 'test password',
        user_email: 'test1@mail.com',
        user_type: 'user',
    },
    // Ununique username
    testUser2: {
        username: `admin`,
        user_name: 'admin',
        user_surname: 'admin',
        user_password: 'admin',
        user_email: 'admin3@mail.com',
        user_type: 'admin',
    },
    // Email invalid
    testUser3: {
        username: "admin",
        user_name: "admin",
        user_surname: "admin",
        user_password: "admin",
        user_email: "admin",
        user_type: "admin"
    },
};

module.exports = testUsers;