const express = require('express');
const db = require('./models')

const app = express();

//middleware
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("test");
});

//db User
const User = db.User;
app.post('/', async (req, res) => {
    const {name, email} = req.body
    console.log('test 1');
    const newUser = await User.create({name, email});
    console.log('test 2');

    res.json({newUser});

})


const PORT = process.env.PORT || 3000;


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})

