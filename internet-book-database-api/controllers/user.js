const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const User = require("../models/user");
const ObjectID = require('mongodb').ObjectID;


exports.createUser = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                gender: req.body.gender,
                role: req.body.role,
                imageURL: req.body.imageURL,
                description: req.body.description,
                registeredOn: req.body.registeredOn,
            })
            user.save()
                .then((result) => {
                    res.status(201).json({
                        message: "User created!",
                        result: result,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Invalid authentication credentials!'
                    });
                });
        })
        .catch(err => console.log(err));
};

exports.loginUser = (req, res, next) => {
    console.log(req.body);
    let fetchedUser;
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed",
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed",
                });
            }
            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                user: fetchedUser
            })
        })
        .catch((err) => {
            return res.status(401).json({
                message: "Invalid authentication credentials!",
            });
        });
};

exports.updateUser = (req, res, next) => {

    const username = req.params.username;
    console.log(username);
    User.findOne({ username: username })
        .then(old => {
            if (!old) {
                res.status(404).json({
                    message: "User does not exists"
                });
            }
            const user = req.body;
            if (old._id.toString() !== user._id.toString()) {
                res.status(400).json({
                    message: 'Does not match ids'
                });
            }
            User.updateOne({ username: username }, { $set: user })
                .then(result => {
                    res.json(user);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        message: 'Unable to update the user'
                    });
                });
        });
};

exports.getUsers = (req, res, next) => {
    const query = User.find({ role: { $ne: 'admin' } });
    query.find()
        .then(documents => {
            res.status(200).json({
                message: 'Fetched successfuly',
                users: documents
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Fetching failed'
            });
        });
};

exports.deleteUser = (req, res, next) => {
    console.log(req.params);
    const id = req.params.id;
    User.deleteOne({ _id: new ObjectID(id) })
        .then(response => {
            if (response.ok && response.deletedCount === 1) {
                res.json({
                    message: 'Successfuly deleted'
                });
            } else {
                res.status(500).json({
                    message: 'Unable to delete user'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                message: 'Invalid user data'
            });
            console.error(err);
        });
}
