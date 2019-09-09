(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var service = {};

        service.Create = Create;
        service.GetAll = GetAll;
        service.Delete = Delete;

        return service;

        function Create(question) {
            return $http.post('/api/questions', question).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/questions/' + _id).then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/questions').then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
