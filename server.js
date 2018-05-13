//import restify module
var restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
//import our user module which handles all CRUD operations on users
var user = require('./User');
//import our database module which handles most of general db operations
var db = require('./database');
var authentication = require('./security.js');
var user_logIn = require('./User_LogIn');
var acc = require('./profile');
var img = require('./load_images');
var U_delete = require('./user_del');
var U_update = require('./profile_update');
var create = require('./create_entity')
var submit = require('./submit')


const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})


//create the restify module
const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)

//initialise the server with required plugins
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser())
server.use(restify.plugins.authorizationParser())

//prepare our database connection parameters
const databaseData = { 
	host:"sql2.freemysqlhosting.net",
    user:"sql2204172",
    password: "aQ1%fG3%",
    database: "sql2204172"
};
//save server port on global variable
var port = 8081;

//route any requests to http://localhost:8081/api/v1/user/logIn to this function
server.post('api/v1/user/logIn', (req, res) => {
    console.log("USER login MODULE CHECK>>>>>>>" + req.body)

    //we are atempting to add a user
    user_logIn.add(databaseData, req, function (err, data) { 
        //when adding a user is done this code will run
        //if we got an error informs the client and set the proper response code
        if (err) {
            res.status(400);
            res.end("error:" + err);
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        console.log("SERVERRRRRRRRRR_LOGIN: " + data)
        res.write(data); // Returns true/false for login outcome
        res.end();
    });
})

//route any requests to http://localhost:8081/v1/profile to this function--------------------------------------------
server.get('api/v1/profile', (req, res) => {
    console.log("api/v1/profile add MODULE CHECK")
	//we are atempting to add a user
	acc.add(databaseData, req, function (err, data){
		//when adding a user is done this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
		}
		//if no error let's set proper response code and have a party
        res.status(201);
        console.log("SERVERRRRRRRRRR_PROFILE: " + data)
        res.write(data)
		res.end();
	});
})

//route any requests to http://localhost:8081/load_images to this function--------------------------------------------
server.get('/load_images', (req, res) => {
    console.log("/load_images add MODULE CHECK")
    //we are atempting to add a user
    img.add(databaseData, req, function (err, data) {
        //when adding a user is done this code will run
        //if we got an error informs the client and set the proper response code
        if (err) {
            res.status(400);
            res.end("error:" + err);
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        res.write(data)
        res.end();
    });
})

//route any requests to http://localhost:8081/api/v1/user/add to this function
server.post('api/v1/user/add', (req, res) => {
    console.log("USER add MODULE CHECK")
	//we are atempting to add a user
	user.add(databaseData, req, function (err, data){
		//when adding a user is done this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
		}
		//if no error let's set proper response code and have a party
        res.status(201);
		res.end("success");
	});
})
//route any requests to http://localhost:8081/api/v1/user/delete to this function
server.del('api/v1/user/delete', (req, res) => {
    console.log("DELETE API")
    U_delete.delete(databaseData, req, function (err, data) {
        if (err) {
            res.status(400);
            res.end("error:" + err);
            return;
        }
        res.status(201);
        res.end(data);
    });

});

//route any requests to http://localhost:8081/api/v1/user/update to this function
server.put('api/v1/user/update', (req, res) => {
    console.log("UPDATE API")
    U_update.update(databaseData, req, function (err, data) {
        console.log("WHOOOOHOOOOO UPDATE")
        if (err) {
            res.status(400);
            res.end("error:" + err);
            return;
        }
        res.status(201);
        res.end(data);
    });

});

//route any requests to http://localhost:8081/api/v1/submit to this function
server.post('api/v1/submit', (req, res) => {
    console.log("Submit API")
    submit.submit_r(databaseData, req, function (err, data) {
        console.log("WHOOOOHOOOOO Submit")
        if (err) {
            res.status(400);
            res.end("error:" + err);
            return;
        }
        res.status(201);
        res.end(data);
    });

});

//this route will allow to create tables in the database
//it should be a confidential method and can be performed only by an admin
server.get('/createTables', (req, res) => {
	
	db.createTables(databaseData, function(err, state){
		if(err) {
			res.status(400);
			res.end("an error has occured:" + err);
			return;
		}
		res.status(200);
		res.end("Command was successfull");
	});
})

//route any requests to http://localhost:8081/api/v1/user/check to this function
server.post('api/v1/user/check', (req, res, callback) => {
    
    user.check_ex(databaseData,req, function(err, data){
        if(err) {

            res.status(400);
            res.end("an error has occured:" +err);
            return;
        }
        res.status(200);
        var result = JSON.stringify(data);
        res.write(result);
        res.end();
    });
});

//start the server 
server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready on port ${port}`)
	}
})
