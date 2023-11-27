require('dotenv').config();
const e = require('express');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: 'thanh',
    database: process.env.DB_NAME
});

con.connect(function (err) {
    if (err) {
        console.log(err)
        return console.log("Kết nối db thất bại")
    }
    console.log("Kết nối Database thành công!");
});


const queryDatabase = (query, values) => {
    return new Promise((resolve, reject) => {
        con.query(query, values, (err, results, fields) => {
            if (err) {
                reject(err);
                console.log("Lỗi kết nối Database!");
                return;
            }
            console.log("Kết nối Database thành công!");
            resolve(results);
        });
    });
};

module.exports = {
    con,
    queryDatabase
}