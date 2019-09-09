var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.post('/', createQuestion);
router.delete('/:_id', deleteQuestion);
router.get('/', getQuestions);


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

function deleteQuestion(req, res) {
    // var userId = req.session.userId;
    // if (req.params._id !== userId) {
    //     // can only delete own account
    //     return res.status(401).send('You can only delete your own account');
    // }

    questionService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getQuestions(req, res){
    // getbyUser(req.session.userId)
    questionService.getAll()  
    .then(function (questions) {
        if (questions) {
            res.send(questions);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}