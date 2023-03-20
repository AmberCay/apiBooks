const connection = require('../database');

function getStart(req, res) {
    let result = {error: false, code: 200, message: 'Starting point'};
    res.send(result)
}

function postRegister(req, response) {
    console.log(req.body);
    let sql = "INSERT INTO user (f_name, l_name, email, photo, password)" + " VALUES ('" +  req.body.f_name + "', '" + req.body.l_name + "', '" + req.body.email + "', '" + req.body.photo + "', '" + req.body.password + "');"
    console.log(sql);
    let answer;
    connection.query(sql, (err, res) => {
        if (err) {
            answer = {error: true, code: 200, message: "wrong db connection", data: res}
        }
        else {
            console.log(res);
            if (res.insertId) {
                answer = {error: false, code: 200, message: String(res.insertId), data: [null]}
                response.send(String(res.insertId));
            }
            else {
                response.send("-1");
            }
        }
    })
}

function postLogin(req, response) {
    let params = [req.body.email, req.body.password]
    let sql = "SELECT * FROM appbooks.user where email = ? And password = ?;"
    let answer;
    connection.query(sql, params, (err, res) => {
        if (res.length == 0) {
            answer = {error:true, code:200, message: 'No user found', data: res}
        }
        else {
            answer = {error: false, code: 200, message:'User found', data: res}
        }
        response.send(answer)
    })
}

module.exports = {getStart, postRegister, postLogin}