const express = require("express");
const bodyParser = require("body-parser");
const User = require('./model');
const app = express();
const rtAPIv1 = express.Router();
const userProcessing = require('./userProcessing');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

let userProcessing = new userProcessing();

rtAPIv1.get("/users/", function(req, res) {
    res.send(userProcessing.userList());
});

rtAPIv1.post("/users/", function(req, res) {
    let user = userProcessing.userCreate(new User(null, req.body.name, req.body.score));
    res.send(user);
});

rtAPIv1.delete("/users/:id", function(req, res) {
    let checkDelete = userProcessing.userDelete(new User(req.params.id, null, null));
    if (checkDelete == 0 || checkDelete == undefined) {
        res.status(500).json({ error: 'Something went wrong!' });
    } else {
        res.sendStatus(200);
    } 
});

rtAPIv1.get("/users/:id", function(req, res) {
    let user = userProcessing.userID(new User(req.params.id, null, null));
    if (user.id == undefined) {
		res.status(500).json({ error: 'Пользователь не был найден' });
	} else {
         res.send(user);
    }
});

rtAPIv1.put("/users/:id", function(req, res) {
    let user = userProcessing.userUpdate(new User(req.params.id, req.query.name, req.query.score));
    if (user.id == undefined) {
		res.status(500).json({ error: 'Пользователь не был найден' });
	}
    res.send(user);
});

function onError(err, statusCode) {
    res.send(JSON.stringify({
        error: err,
        id: data.id
    }), statusCode);
}

app.use("/api/v1", rtAPIv1);

app.listen(3000);