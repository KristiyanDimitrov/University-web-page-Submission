var db = require('./database');
var mysql = require('mysql');
//this function is responsible for loging in
exports.add = function(conData, req, callback){ 
    //console.log(req); // mario added this to test
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
        }	

        //if no error prepare our user object with the values sent by the client
        console.log(">>>>>>>>>" + req.body)
        
        var user = {
            userName: req.body['user_Name'],
            pass: req.body['pass']
        };
        console.log(req)
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(2)")
        

        sql = "SELECT * FROM users WHERE userName='" + user.userName + "';";
        console.log(sql);
        data.query(sql, function (err, result) {
            if (err) throw err;
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + result[0])
            if (result.userName === undefined && result[0] === undefined) {
                let outcome = "falseU";
                callback(err, outcome);
                return false;
            }


            //decrypt pass
            const bcrypt = require('bcryptjs');

            if (bcrypt.compareSync(user.pass, result[0].pass)) {
                console.log("loged in !!!!!!!!!!");
                let outcome = "true";
                callback(err, outcome);
            } else {
                let outcome = "falseP";
                callback(err, outcome);
            }

        });
        

     
        
        
        
	});
};


