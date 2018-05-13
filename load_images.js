//import mysql driver
var mysql = require('mysql');
var db = require('./database');




exports.add = function (conData, req, callback) {

    db.connect(conData, function (err, data) {

      
        if (err) {
            callback(err);
            return;
        }

        var Type = {
            type : req.query["type"]
        }

        let sql = 'select id, path, title from images order by id desc;'
        console.log(Type.type);
        if (Type.type === "inBook") {
            sql = 'select id, path, title from images where category = "inBook"  order by id desc;';
        }else if (Type.type === "submitted") {
            sql = 'select id, path, title from images where category = "submitted"  order by id desc;';
        }else if (Type.type === 0) {
            callback(err, 0)
        }else if (Type.type === 1) {
            callback(err, 1)
        }else if (Type.type === 2) {
            callback(err, 2)
        }else if (Type.type === "upload") {
            callback(err, 3)
        } else if (Type.type === "image_view") {
            callback(err, 4)
        };

        
        console.log(sql);
        console.log("oooooooooooooooooooOOOOOOOOOOOOOOOOOOOOOOOO" + Type.type)
        data.query(sql, function (err, result) {
            if (err) throw err;
            result = JSON.stringify(result);
            
            callback(err, result);
        });


        });
};




