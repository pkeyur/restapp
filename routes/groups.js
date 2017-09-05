//lists all existing groups
exports.listGroups = function(req, res) {
    try{
        console.log('received request for listGroups');
        req.getConnection(function(err, connection) {
            connection.query('SELECT * FROM groups', function(err, rows) {
                if (err) {
                    console.log("Error Selecting : %s ", err);
                    return next(err);
                }
                var resGrp = [];
                for (var grpIndex in rows) {
                    var grpObj = rows[grpIndex];
                    resGrp.push(grpObj);
                    console.log(grpObj);
                }
                res.json(resGrp);
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
};

//get an existing group based on group_id
exports.getID = function(req, res) {
    try{
        console.log('received request for getID');
        var id = req.params.id;
        req.getConnection(function(err, connection) {
            connection.query('SELECT * FROM groups WHERE group_id=?', id, function(err, rows) {
                if (err) {
                    console.log("Error Selecting : %s ", err);
                    return next(err);
                }
                var resGrp = [];
                for (var grpIndex in rows) {
                    var grpObj = rows[grpIndex];
                    resGrp.push(grpObj);
                    console.log(grpObj);
                }
                res.json(resGrp);
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
};

//create a new group
exports.createGroup = function(req, res) {
    try{
        console.log('received request for createGroup');
        var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function(err, connection) {
            var data = {
                group_name: input.gName
            };
            var query = connection.query("INSERT INTO groups set ? ", data, function(err, rows) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                    return next(err);
                }
                res.redirect('/groups');
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
};

//add an existing user to the existing group
exports.addUserToGroup = function(req, res) {
    try{
        console.log('received request for addUserToGroup');
        var id = req.params.id;
        var userId = req.params.userId;
        req.getConnection(function(err, connection) {
            var data = {
                group_id: id,
                user_id: userId
            };
            var query = connection.query("INSERT INTO associated_users set ? ", data, function(err, rows) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                    return next(err);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
};

//delete an existing group
exports.deleteGroup = function(req, res) {
    try{
        console.log('received request for deleteGroup');
        var id = req.params.id;
        req.getConnection(function(err, connection) {
            connection.query("DELETE FROM groups WHERE group_id = ? ", id, function(err, rows) {
                if (err) {
                    console.log("Error deleting : %s ", err);
                    return next(err);
                } else {
                    console.log('deleting successfully');
                    res.sendStatus(200);
                }
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
};

//remove an existing user from the existing group
exports.removeUserFromGroup = function(req, res) {
    try{
        console.log('received request for removeUserFromGroup');
        var id = req.params.id;
        var userId = req.params.userId;
        req.getConnection(function(err, connection) {
            connection.query("DELETE FROM associated_users WHERE user_id = ? and group_id = ?", [userId, id], function(err, rows) {
                if (err) {
                    console.log("Error deleting : %s ", err);
                    return next(err);
                } else {
                    console.log('deleting successfully');
                    res.sendStatus(200);
                }
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
};