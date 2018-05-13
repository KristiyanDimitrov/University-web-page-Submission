var db = require('./database');
//this function is responsible for adding a new user
exports.add = function (conData, req, callback) {
    //console.log(req); // mario added this to test
    //first connect to DB
    db.connect(conData, function (err, data) {
        //console.log(req);

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }
        
        
        var Acc = {
            acc: req.query["account"]
        }
        
        sql = "SELECT * FROM users WHERE userName='" + Acc.acc + "';";
        console.log(sql);
        data.query(sql, function (err, result) {
            
            if (err) throw err;
            
           
            result = JSON.stringify(result)
            callback(err, result);

        });
    });
};
