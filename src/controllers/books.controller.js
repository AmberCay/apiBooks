const Book = require('../models/book');
const connection = require('../database');

function getStart(req, res) {
    let answer = {error: true, code:200, message: 'Starting point', data: null};
    res.send(answer);
}

function getBooks(req, response) {
    console.log(req.query);
    let id_user = req.query.id_user;
    let id_book = req.query.id_book;
    let answer;
    let sql;
    // console.log(id_book);
    if (id_user != undefined && id_book != undefined) {
        let params = [id_user, id_book]
        sql = "SELECT * FROM appbooks.book as b right join user as u ON (b.id_user = u.id_user) where u.f_name = ? and b.id_book= ?;"
        connection.query(sql, params, (err, res) => {
            if (err) {
                answer = {error: true, code: 200, message: "wrong db connection", data: res}
            }
            else {
                let uniqueBook = new Book(res[0].id_book, res[0].id_user, res[0].title, res[0].type, res[0].author, res[0].price, res[0].photo);
                answer = {error: false, code: 200, message: "book found", data: [uniqueBook]};
                console.log(res);
                console.log(uniqueBook);
            }
            response.send(answer)
        })
    }
    else if (id_user != undefined && id_book == undefined) {
        let params = [id_user];
        sql = "SELECT id_book, b.id_user, title, type, author, price, b.photo FROM appbooks.book as b RIGHT JOIN user as u ON (b.id_user = u.id_user) where u.f_name = ?;"
        connection.query(sql, params, (err, res) => {
            if (err) {
                answer = {error: true, code: 200, message: "user not found", data: [null]}
            }
            else {
                let listbooks = []
                console.log(res);
                res.forEach(bookie => {
                    listbooks.push(new Book(bookie.id_book, bookie.id_user, bookie.title, bookie.type, bookie.author, bookie.price, bookie.photo));
                })
                answer = {error: false, code: 200, message: "books found amber", data: listbooks}
            }
            response.send(answer)
        })
    }
}

function postBook(req, response) {
    let sql = "INSERT INTO book (id_user, title, type, author, price, photo)" + " VALUES ('" + req.body.id_user + 
                                "', '" + req.body.title + 
                                "', '" + req.body.type + 
                                "', '" + req.body.author + 
                                "', '" + req.body.price + 
                                "', '" + req.body.photo + "');"
    let answer;
    connection.query(sql, (err, res) => {
        console.log(sql);
        if (err) {
            answer = answer = {error: true, code: 200, message: "wrong db connection", data: res}
        }
        else {
            if (res.insertId) {
                answer = {error: false, code: 200, message: String(res.insertId), data: [null]}
            }
            else {
                answer = {error: true, code: 200, message: "-1", data:[null]}
            }
        }
        response.send(answer)
    })
}

function putBook(req, response) {
    let params = [req.body.id_user,
                    req.body.title,
                    req.body.type,
                    req.body.author,
                    req.body.price,
                    req.body.photo,
                    req.body.id_book]
    let sql = "UPDATE book SET id_user = COALESCE(?, id_user), title = COALESCE(?, title), type = COALESCE(?, type), author = COALESCE(?, author), price = COALESCE(?, price), photo = COALESCE(?, photo) WHERE (id_book = ?);"
    let answer;
    connection.query(sql, params, (err, res) => {
        if (err) {
            answer =  {error: true, code: 200, message: "wrong db connection", data: res};
            console.log(err);
        }
        else {
            answer = {error: false, code: 200, message: String(res.affectedRows), data: res}
        }
        response.send(answer)
        // in front, succesful edit is when message === "1", and failed edit is message === "0"
    })
}

function delBook (req, response) {
    let params = [req.body.id_book];
    console.log(req.body);
    let sql = "DELETE FROM book WHERE (id_book = ?)";
    let answer;
    connection.query(sql, params, (err, res) => {
        if (err) {
            answer = {error: true, code: 200, message: "wrong db connection", data: res};
        }
        else {
            answer = {error: false, code: 200, message: String(res.affectedRows), data: res}
        }
        response.send(answer)
    })
}

module.exports = {getStart, getBooks, postBook, putBook, delBook}