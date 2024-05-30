let app = angular.module("app",[
  "ctrl",
  "filters",
  "ngRoute",
  "ngSanitize",
  "ngQuill",
]);

app.config([
  "$routeProvider",
  "ngQuillConfigProvider",
  function ($routeProvider, ngQuillConfigProvider) {
    ngQuillConfigProvider.set();

    $routeProvider
      .when("/", {
        templateUrl: "./views/home.html",
        controller: "homeCtrl",
      })
      .when("/categories", {
        templateUrl: "./views/categories.html",
        controller: "categoriesCtrl",    
      })
      .when("/books", {
        templateUrl: "./views/books.html",
        controller: "bookCtrl",
      })
      .when("/books/new", {
        templateUrl: "./views/book-new.html",
        controller: "bookAddCtrl",
      })
      .when("/books/details/:id", {
        templateUrl: "./views/book-details.html",
        controller: "bookDetailCtrl",
      })
      .when("/books/edit/:id", {
        templateUrl: "./views/book-edit.html",
        controller: "bookEditCtrl",
      })
      .otherwise({ templateUrl: "./views/404.html" });
  },
]);

app.run(function ($rootScope, $http, $location) {
    $http.get("json/home.json").then(function (res) {
      $rootScope.homeData = res.data;
    });
    $http.get("json/categories.json").then(function (res) {
      $rootScope.categories = res.data;
    });
    $http.get("json/books.json").then(function (res) {
      $rootScope.books = res.data;
    });
  
    $rootScope.$on("$locationChangeSuccess", function () {
      console.log($location.path());
      $rootScope.page = $location.path();
    });
  });