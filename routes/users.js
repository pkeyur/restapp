//lists all existing users
exports.listUsers = function(req, res) {
    console.log('received request for listUsers');
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users', function(err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            var resUsr = [];
            for (var usrIndex in rows) {
                var usrObj = rows[usrIndex];
                resUsr.push(usrObj);
                console.log(usrObj);
            }
            res.json(resUsr);
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
            }
            var resUsr = [];
            for (var usrIndex in rows) {
                var usrObj = rows[usrIndex];
                resUsr.push(usrObj);
                console.log(usrObj);
            }
            res.json(resUsr);
        });
    });
};
