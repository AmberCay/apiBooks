const connection = require('../database');

function getStart(req, res) {
    let result = {error: false, code: 200, message: 'Starting point'};
    res.send(result)
}

function postRegister(req, response) {
    console.log(req.body);
    let sql = "INSERT INTO user (f_name, l_name, email, photo, password)" + " VALUES ('" +  req.body.f_name + "', '" + req.body.l_name + "', '" + req.body.email + "', '" + req.body.photo + "', '" + req.body.password + "');"
    console.log(sql);
    connection.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res);
            if (res.insertId) {
                response.send(String(res.insertId));
            }
            else {
                response.send("-1");
            }
        }
    })
}

module.exports = {getStart, postRegister}