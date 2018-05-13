var db = require('./database');

//this function is responsible for deleting an user
exports.delete = function (conData, req, callback) {
    //console.log(req); // mario added this to test
    //first connect to DB
    db.connect(conData, function (err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        take = req.body
        var user = {
            userName: take.account //req.body['user_Name'], NO ACCESS TO BODY???????????
        };

        console.log(take)
        console.log("____")
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DELETE ACC: " + user.userName)


        sql = "DELETE FROM users WHERE userName='" + user.userName + "';";
        console.log(sql);
        data.query(sql, function (err, result) {
            callback(err, "success");
        });

            
        });
    };
