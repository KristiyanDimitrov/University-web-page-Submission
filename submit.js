var db = require('./database');
//this function is responsible for deleting an user
exports.submit_r = function (conData, req, callback) {
    //console.log(req); // mario added this to test
    //first connect to DB
    db.connect(conData, function (err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        let take = req.body
        var recipe = {
            id: "10",
            title: take.title,
            category: take.category,
            path: take.path,
        };

        console.log("_______________________________________________________________")
        
        data.query('INSERT INTO images SET ?', recipe, function (err, result) {
            console.log(">>>>>>>>>>>>>>>>>>>++" + result);
            //return control to the calling module
            let resp = "success"
            callback(err,resp );
        });


    });
};