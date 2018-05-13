var db = require('./database');

//this function is responsible for adding a new user
exports.add = function (conData, req, callback) {

    //first connect to DB
    db.connect(conData, function (err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }
        //acc_info = eval(acc_info);
        //if no error prepare our user object with the values sent by the client
        //body = JSON.stringify(req.body)

        let info = req.body
        console.log("Kakvo podqvolite, brat plssss")
        if (info.pass == undefined) {
            console.log("AAAAAA ")
            callback(err)
        }
        else {
            var user = {
                userName: info.userName,
                pass: info.pass,
                eMail: info.eMail,
                purpose: info.purpose
            };

            console.log("whyyyy: " + user.pass)
            let salt = 10;
            const bcrypt = require('bcryptjs');
            let hash = bcrypt.hashSync(user.pass, salt);
            user.pass = hash;

            //perform the query
            data.query('INSERT INTO users SET ?', user, function (err, result) {
                console.log(">>>>>>>>>>>>>>>>>>>++" + result);
                //return control to the calling module
                callback(err, user);
            });
        };

    });
};

