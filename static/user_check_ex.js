exports.check_ex = function (conData, req, callback) {

    //first connect to DB
    db.connect(conData, function (err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }
        console.log("user EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx.js")
        console.log("user:" + req.body['userName']);

        data.query('SELECT * FROM users WHERE userName = ?', [req.body], function (err, result) {
            if (result == 0) {
                data = { available: true };
                console.log("available");
            } else {
                data = { available: false };
                console.log("taken");
            }
            callback(err, data);
        });
    });
};