var app = angular.module('todolist', [
    'ui.router'
]);

app.constant('BASE_URL', 'http://localhost:8000/todo/api/todos/');

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/static/templates/todo.html',
            controller: 'MainCtrl'
        })
        .state('add-todo', {
            url: "/add",
            templateUrl: '/static/templates/add_todo.html',
            controller: 'MainCtrl'
         })
         .state('edit-todo', {
            url: "/edit",
            templateUrl: '/static/templates/edit_todo.html',
            controller: 'EditCtrl',
            params: { edited_todo: { value: { name: ""}}}
         });

    $urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', function($scope, Todos, $state){
    $scope.newTodo = {};
    $scope.addTodo = function() {
        Todos.addOne($scope.newTodo)
            .then(function(res){
                $state.go('home');
            });
    };

    $scope.toggleCompleted = function(todo) {
        Todos.update(todo);
    };

    $scope.deleteTodo = function(id){
        Todos.delete(id);
        $scope.todos = $scope.todos.filter(function(todo){
            return todo.id !== id;
        })
    };

    Todos.all().then(function(res){
        $scope.todos = res.data;
    });

    $scope.goEdit = function(todo) {
        $state.go('edit-todo', {edited_todo: todo})}
    });

app.controller('EditCtrl', function($scope, Todos, $state, $stateParams){
    $scope.editedTodo = $stateParams.edited_todo

    $scope.editTodo = function(todo) {
        Todos.update(todo)
            .then(function(res){
                $state.go('home');
            });
    };
});

app.service('Todos', function($http, BASE_URL){
    var Todos = {};

    Todos.all = function(){
        return $http.get(BASE_URL);
    };

    Todos.update = function(updatedTodo){
        return $http.put(BASE_URL + updatedTodo.id + '/', updatedTodo);
    };

    Todos.delete = function(id){
        return $http.delete(BASE_URL + id + '/');
    };

    Todos.addOne = function(newTodo){
        return $http.post(BASE_URL, newTodo)
    };

    return Todos;
});
