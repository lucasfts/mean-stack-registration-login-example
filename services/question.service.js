var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.create = create;

module.exports = service;


function create(questionParam) {
    var deferred = Q.defer();

    createQuestion(questionParam);

    // validation
    // db.questions.findOne(
    //     { title: questionParam.title },
    //     function (err, question) {
    //         if (err) deferred.reject(err.name + ': ' + err.message);

            
    //         createQuestion(questionParam);
            
    //     });

    function createQuestion(question) {
        // set user object to userParam without the cleartext password
        // var user = _.omit(userParam, 'password');

        // add hashed password to user object
        // user.hash = bcrypt.hashSync(userParam.password, 10);

        db.questions.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
