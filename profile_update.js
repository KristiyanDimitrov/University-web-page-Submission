var db = require('./database');
//this function is responsible for deleting an user
exports.update = function (conData, req, callback) {
    //console.log(req); // mario added this to test
    //first connect to DB
    db.connect(conData, function (err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }
        
        var user = {
            userName: req.userName //req.body['user_Name'], NO ACCESS TO BODY???????????
        };



        if (user.userName == null){
            callback(err,"No username")
        };
      
        sql = "UPDATE users SET userName = '" + user.userName + "' where userName = '" + user.userName + "';"
        console.log(sql);
        data.query(sql, function (err, result) {
            if (err) throw err;
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + result[0])
            callback(err, result[0]);
        });


    });
};
