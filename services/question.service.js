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
service.getAll = getAll;
service.delete = _delete;


module.exports = service;


function create(questionParam) {
    var deferred = Q.defer();

    createQuestion(questionParam);

    function createQuestion(question) {
        db.questions.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.questions.find().toArray(function (err, questions) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (questions) {
            // return user (without hashed password)
        //    return questions;
        deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
