const {Router} = require('express');
const router = Router();
const booksCTRL = require('../controllers/books.controller');

router.get("/", booksCTRL.getStart)

router.get("/books", booksCTRL.getBooks)

router.post("/books", booksCTRL.postBook)

router.put("/books", booksCTRL.putBook)

router.delete("/books", booksCTRL.delBook)

module.exports = router