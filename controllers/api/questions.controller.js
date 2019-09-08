var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.post('/', createQuestion);
router.get('/', getQuestion);

module.exports = router;

function createQuestion(req, res) {
    questionService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getQuestion(req, res){
    res.sendStatus(200);
}