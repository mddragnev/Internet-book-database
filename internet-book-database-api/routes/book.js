const express = require("express");
const router = express.Router();
const BookControler = require('../controllers/book');

router.post("/", BookControler.createBook);
router.get("/", BookControler.getBooks);
router.get("/:name", BookControler.getBook);
router.put("/:id", BookControler.updateBook);

module.exports = router;
