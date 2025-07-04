require('dotenv').config();
const express = require('express');
const connectToDB = require("./database/db");
const  bookRoutes =  require('./routes/book-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
connectToDB();

//middleware -> express.json()
app.use(express.json());

//routes here
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.listen(3001,(err)=>{
    console.log(err)
    console.log(`Server is listening at port ${3001}`);
});