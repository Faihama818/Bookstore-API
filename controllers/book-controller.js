//const Book = require('../models/book');

const { request } = require('express');
const db = require('..//database/mysql-db');

//Static bookstore list
const getBookstoreList = (req,res)=>{
    const bookstoreList = [
        {
            title: "The great gatsby",
            author: "F. Scott",
            year: 2000
        },
        {
            title: "To kill a mckingbird",
            author: "Harper Lee",
            year: 1977
        },
        {
            title: "A song of ice and fire",
            author: "George Martin",
            year: 1996
        },
        {
            title: "Pride and prejudice",
            author: "Jane Austen",
            year: 1974
        },
        {
            title: "The 48 laws of power",
            author: "Robert Greene",
            year: 1988
        }
        
    ];

    res.status(200).json({
        success: true,
        message: 'Bookstore list retrieved successfully',
        data: bookstoreList
    })
}

const getAllBooks = (req,res)=>{
    const query = 'SELECT * FROM books';
    db.query(query, (err,results)=>{
        if(err){
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching books!'
            })
        }
        if(results.length == 0){
            return res.status(200).json({
                success: true,
                message: 'No books in your collection!'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                data: results
            });
        }
    });
}

const getSingleBookById = (req,res)=>{
    const {id} = req.params;
    const query = 'SELECT * FROM books WHERE id = ?';
    db.query(query, [id], (err,results)=>{
        if(err){
            console.error('Error fetching book:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching book'
            })
        }
        if(results.length == 0){
            return res.status(404).json({
                success: false,
                message: 'Book with current ID not found! Please try again with a different ID'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                data: results[0]
            })
        }
    })

}

const addNewBook = (req,res)=>{
    const {title, author, year} = req.body;

    const query = 'INSERT books (title, author, year) VALUES (?, ?, ?)';
    db.query(query, [title, author, year], (err,result)=>{
        if(err){
            console.error('Error adding book:', err);
            return res.status(500).json({
                success: false,
                message: 'Error adding book'
            });
        }
        else{
            return res.status(201).json({
                success: true,
                message: 'Book added successfully!'
            });
        }
    })
}

const updateBook = (req,res)=>{
    const {id} = req.params;
    const {title, author, year} = req.body;

    const query = 'UPDATA books SET title = ?, author = ?, year = ? WHERE id = ?';
    db.query(query, [title, author, year, id], (err,result)=>{
        if(err){
            console.error('Error updating book:', err);
            return res.status(500).json({
                success: false,
                message: 'Error adding book'
            });
        }
        if(result.affectedRows == 0){
            return res.status(404).json({
                success: false,
                message: 'Book with ID not found!'
            });
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'Book updated successfully!'
            });
        }
    })
}

const deleteBook = (req,res)=>{
    const {id} = req.params;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [id], (err,result)=>{
        if(err){
            console.error('Error deleting book:', err);
            return res.status(500).json({
                success: false,
                message: 'Error deleting book'
            });
        }
        if(result.affectedRows == 0){
            return res.status(404).json({
                success: false,
                message: 'Book with ID not found!'
            });
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'Book deleted successfully!'
            });
        }
    })
}


// //Static bookstore list
// const getBookstoreList = (req,res)=>{
//     const bookstoreList = [
//         {
//             title: "The great gatsby",
//             author: "F. Scott",
//             year: 2000
//         },
//         {
//             title: "To kill a mckingbird",
//             author: "Harper Lee",
//             year: 1977
//         },
//         {
//             title: "A song of ice and fire",
//             author: "George Martin",
//             year: 1996
//         },
//         {
//             title: "Pride and prejudice",
//             author: "Jane Austen",
//             year: 1974
//         }
        
//     ];

//     res.status(200).json({
//         success: true,
//         message: 'Bookstore list retrieved successfully',
//         data: bookstoreList
//     })
// }


// const getAllBooks = async(req,res)=> {
//     try {
//         const allBooks = await Book.find({});
//         if(allBooks?.length > 0){
//             return res.status(200).json({
//                 success: true,
//                 message: 'List of books fetched successfully',
//                 data: allBooks
//             })
//         }
//         else{
//             return res.status(404).json({
//                 status: false,
//                 message: 'No books found in collection'
//             })
//         }
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({
//             status: false,
//             message: 'Something went wrong! Please try again'
//         })
//     }
// }

// const getSingleBookById = async(req,res)=> {
//     try {
//         const getCurrentBookId = req.params.id;
//         const bookDetailsById = await Book.findById(getCurrentBookId);
//         if(!bookDetailsById){
//             return res.status(404).json({
//             status: false,
//             message: 'Book with current ID not found! Please try again with a different ID'   
//             })
//         }
//         else{
//             res.status(200).json({
//                 status: true,
//                 data: bookDetailsById
//             })
//         }
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//         status: false,
//         message: 'Something went wrong! Please try again'
//         });
        
//     }
// }

// const addNewBook = async(req,res)=> {
//     try {
//         const newBookFormData = req.body;
//         const newlyCreatedBook = await Book.create(newBookFormData);
//         if(newBookFormData){
//             res.status(201).json({
//                 success: true,
//                 message: 'Book added successfully',
//                 data: newlyCreatedBook
//             })
//         }
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//         status: false,
//         message: 'Something went wrong! Please try again'
//         })
//     }
// }

// const updateBook = async(req,res)=> {
//     try {
//         const updatedBookFormData = req.body;
//         const getCurrentBookId = req.params.id;
//         const updatedBook = await Book.findByIdAndUpdate(getCurrentBookId, updatedBookFormData, {
//             new: true
//         });
//         if(!updatedBook){
//             res.status(404).json({
//                 success: false,
//                 message: 'Book with ID not found'
//             })
//         }
//         else{
//             res.status(200).json({
//                 success: true,
//                 message: 'Book updated successfully',
//                 data: updatedBook
//             })
//         }
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//         status: false,
//         message: 'Something went wrong! Please try again'
//     })
//     }
// }

// const deleteBook = async(req,res)=> {
//     try {
//         const getCurrentBookId = req.params.id;
//         const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);
//         if(!deletedBook){
//             res.status(404).json({
//                 success: false,
//                 message: 'Book with ID not found'
//             })
//         }
//         else{
//             res.status(200).json({
//                 success: true,
//                 data: deletedBook,
//                 message: 'Book with ID deleted successfully'
//             })
//         }
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//         status: false,
//         message: 'Something went wrong! Please try again'
//     })
//     }
// }

module.exports = {
    getAllBooks, 
    getSingleBookById, 
    addNewBook, 
    updateBook, 
    deleteBook,
    getBookstoreList
}