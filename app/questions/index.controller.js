(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller(UserService, QuestionService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.question = { };

        vm.saveQuestion = saveQuestion;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                 vm.question.title = "werwer";
            });
        }

        function saveQuestion() {
            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Question Created');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();