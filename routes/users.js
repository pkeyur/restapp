//lists all existing users
exports.listUsers = function(req, res) {
    console.log('received request for listUsers');
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                return next(err);
            }else{
                var resUsr = [];
                for (var usrIndex in rows) {
                    var usrObj = rows[usrIndex];
                    resUsr.push(usrObj);
                    console.log(usrObj);
                }
                res.json(resUsr);
            }
        });
    });
};

//get an existing user based on user_id
exports.getID = function(req, res) {
    console.log('received request for getID');
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE user_id=?', [id], function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
                return next(err);
            }
            else{
                var resUsr = [];
                for (var usrIndex in rows) {
                    var usrObj = rows[usrIndex];
                    resUsr.push(usrObj);
                    console.log(usrObj);
                }
                res.json(resUsr);
            }
        });
    });
};

//create a new user
exports.createUser = function(req, res) {
    console.log('received request for createUser');
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection) {
        var data = {
            user_name: input.uName,
            user_address: input.uAddress
        };
        var query = connection.query("INSERT INTO users set ? ", data, function(err, rows) {
            if (err) {
                console.log("Error inserting : %s ", err);
                return next(err);
            }
            else{
                res.redirect('/users');
            }
        });
    });
};

//delete an existing user
exports.deleteUser = function(req, res) {
    console.log('received request for deleteUser');
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query("DELETE FROM users WHERE user_id = ? ", id, function(err, rows) {
            if (err) {
                console.log("Error deleting : %s ", err);
                return next(err);
            } else {
                console.log('deleting successfully');
                res.sendStatus(200);
            }
        });
    });
};