const mysql = require('mysql2');
require('dotenv').config();

//configure db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//connect to db
db.connect((err) => {
    if(err){
        console.error('Database connection failed!:', err.stack);
        return;
    }
    else{
        console.log('MySQL database connected successfully!');
    }
});

module.exports = db;