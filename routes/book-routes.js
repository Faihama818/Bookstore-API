const express = require('express');
const {getBookstoreList, getAllBooks, getSingleBookById, updateBook, deleteBook, addNewBook} = require('../controllers/book-controller')
const authMiddleware = require('../middleware/auth-middleware');

//express router
const router = express.Router()

//apply middleware to all book routes
router.use(authMiddleware);

//routes related to book
router.get('/get', getAllBooks);
router.get('/get/:id', getSingleBookById);
router.post('/add', addNewBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);
router.get('/list', getBookstoreList);

module.exports = router;