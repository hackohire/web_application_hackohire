var express = require('express');
var router = express.Router();
var path = require("path");
var request = require('request');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var database;

var opts = {
    "host": "localhost",
    "port": 27017,
    "database": "hackohire",
    "auth": false,
    "username": ""
};
var DBUrl = 'mongodb://' + opts.host + ':' + opts.port + '/' + opts.database;
Database(function (err, done) {
    if (err) {
        console.log("Database Creation Error")
    }
    else {
    }
});

function Database(callback) {
    MongoClient.connect(DBUrl, function (err, db) {
        if (err) {
            return callback(err, null);
        }
        else if (!db) {
            return callback("some thing went wrong");
        }
        else {
            console.log("Database Connection created")
            database = db;
            callback(null, db);
        }
    })
}

router.get('/', function (req, res, next) {
    console.log("from here login beginssssssss*************");
});
router.post('/newUser', function (req, response) {
    console.log("I am inside Server Function", req.query);
    var re = JSON.parse(req.query.regDe);

    if (!database) {
        Database(function (err, done) {
            if (err) {
                response.send("db error").status(400)
            }
            else {
                final();
            }
        })
    }
    else {
        final();
    }

    function final() {
        getNextSequence(database, "userId", function (err, seqId) {
            if (err) {
                response.send("db error").status(400)
            }
            else if (seqId) {
                var format = { '_id': seqId, "email": re.e, "password": re.p, "type": re.t };
                database.collection('users').insert(format, function (err, res) {
                    if (err) {
                        response.send("db error").status(400)
                    }
                    else {
                        var id = res.ops[0]._id;
                        var t = res.ops[0].type;
                        response.send({ 'id': id, 't': t }).status(200)

                    }
                });
            }
        })
    }
});
router.post('/Userlogin', function (req, res) {
    console.log(req.query.LDetails);
    var v = JSON.parse(req.query.LDetails);
    if (!database) {
        Database(function (err, done) {
            if (err) {
                res.send("db error").status(400)
            }
            else {
                final();
            }
        })
    }
    else {
        final();
    }
    function final() {
        database.collection('users').find({ "email": v.e, "password": v.p }).toArray(function (err, done) {
            if (err) {
                return res.send("something went wrong").status(400)
            }
            else {
                if(done.length ===0){
                    res.send("notfound").status(404)
                }
                else{
                res.send({ 'id': done[0]._id, 't': done[0].type }).status(200)
                }
            }
        })
    }

});
function getNextSequence(db, name, callback) {
    db.collection("counters").findAndModify({ _id: name }, [], { $inc: { seq: 1 } }, {
        upsert: true,
        new: true
    }, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.value.seq)
        }
    });
}

module.exports = router;
