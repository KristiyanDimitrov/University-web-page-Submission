//import mysql driver
var mysql = require('mysql');

//export a function to open a connection to the database, we will need
//to always open a connection before we do any database operation or execute any query
//this function recieve the database access information and a callback function
//eventually the callback function will either be called with errors if any happened or
//be called and the connection object is passed to it with null for error 
exports.connect = function(conData, callback){
	
	var con = mysql.createConnection({
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
		  database: conData.database
		});
	con.connect(function(err) {
		if (err) callback(err);
		callback(null, con);
	});
};

//export a function to create database tables
//this function suppose to create all our tables for us, we will need to call it only one time
//that is when we are setting up our final system, also note that this function should only be accessed 
//by the administrator of the website, so it is very credential, currently we do not have
//any protection over it
exports.createTables = function (conData, callback){
	var con = mysql.createConnection({
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
		  database: conData.database
    });

    con.connect(function (err) {
        if (err) throw err;
        sql = "delete from images where id='10'"
        //sql = "INSERT INTO images (id, path, title, category) VALUES ('8', 'https://scontent-lht6-1.xx.fbcdn.net/v/t34.0-12/25323215_1881101465252762_1364735876_n.jpg?oh=5fd353d4c71439e807fa46c051c0cfd5&oe=5A315387', 'Fresh Tomato Soup', 'submitted') "
        //sql = "update images set path='https://scontent-lht6-1.xx.fbcdn.net/v/t34.0-12/25394240_1884469671582608_327945892_n.jpg?oh=ecec99e43848d25182f17f4915fc1aa1&oe=5A35151E' where id = '10'"
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log("<<<<<<<<<<<<<")
            console.log(result);
            console.log(">>>>>>>>>>>>>>>")
            callback(err, result);
        });
    });
};

