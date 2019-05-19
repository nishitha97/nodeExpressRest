const express = require("express"),
    mongoose = require("mongoose");
const port=3001;
mongoose.Promise = global.Promise;
const app = express();
app.use(express.json(), express.static(__dirname));
const UserModel = require('./user');

mongoose.connect('mongodb://localhost:27017/nodetest', err => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
});

app.get('/', (req, res, next) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    UserModel.find().exec().then(users => {res.json(users);
}).catch(err => {console.error(err);
    res.sendStatus(500);
    });
});

app.get('/users/:id', (req, res) => {
    UserModel.findById(req.params.id).exec().then(user => {
        res.json(user || {}); }).catch(err => { console.error(err); res.sendStatus(500);
        });
});

app.post('/users', (req, res) => {
    const user = new UserModel(req.body);
user.save().then(user => {
    res.json(user);
}).catch(err => {
    console.error(err);
    res.sendStatus(500);
    });
});

app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }console.log(`app listening on port ${port}`);
});



