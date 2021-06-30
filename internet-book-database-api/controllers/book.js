const Book = require("../models/book");
const ObjectID = require('mongodb').ObjectID;

exports.createBook = (req, res, next) => {
    const book = new Book({
        name: req.body.name,
        description: req.body.description,
        imageURL: req.body.imageURL
    });
    book.save()
        .then(result => {
            res.status(201).json({
                message: 'Book created',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Could not create new book.'
            });
        });
};

exports.getBooks = (req, res, next) => {
    const query = Book.find();
    query.find()
        .then(documents => {
            res.status(200).json({
                message: 'Fetched successfuly',
                books: documents
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Fetching failed'
            });
        });
};

exports.getBook = (req, res, next) => {
    Book.findOne({name: req.params.name})
    .then(book => {
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: 'Book not found!'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'There is error in finding book!'
        });
    });
};

exports.updateBook = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    Book.findOne({ _id: new  ObjectID(id)})
        .then(old => {
            if (!old) {
                res.status(404).json({
                    message: "Book does not exists"
                });
            }
            const book = req.body;
            
            Book.updateOne({ _id: new ObjectID(id) }, { $set: book })
                .then(result => {
                    res.json(book);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        message: 'Unable to update the book'
                    });
                });
        });
};
