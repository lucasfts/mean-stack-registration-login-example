(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller(UserService, QuestionService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.question = null;
        vm.questions = null;

        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });

            getQuestions();
        }

        function saveQuestion() {
            if(!vm.question || !vm.question.title) return;

            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Question Created');
                    getQuestions();
                    vm.question = null;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion(elem) {
          console.log(elem);
            QuestionService.Delete(elem.q._id)
                .then(function () {
                    FlashService.Success('Question Deleted');
                    getQuestions();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getQuestions(){
            QuestionService.GetAll().then(function (questions) {
                vm.questions = questions;
            });
        }
    }

    

})();