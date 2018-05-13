var db = require('./database');

//this function is responsible for adding a new user
exports.create = function (conData, req, callback) {

    //first connect to DB
    db.connect(conData, function (err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }
       
        
        var recepi = {
            id: info.id,
            path: info.path,
            title: info.title,
            category: info.category,
            description: info.description
        };



        //perform the query
        data.query('INSERT INTO pictures SET ?', recepi, function (err, result) {
            console.log(">>>>>>>>>>>>>>>>>>>++" + result);
            //return control to the calling module
            callback(err, user);
        });
    });
};
