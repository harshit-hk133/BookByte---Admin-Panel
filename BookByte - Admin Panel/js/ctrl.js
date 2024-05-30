let ctrl = angular.module("ctrl", []);

// home Controller
ctrl
  .controller("homeCtrl", function ($scope, $rootScope) {
    $scope.about = $rootScope.homeData.about;
  })

  // Categories Controller
  .controller("categoriesCtrl", function ($scope, $rootScope) {
    $scope.searchType = "title";
    $scope.searchText = "";

    $scope.newCategory = {};
    $scope.addNewCategory = () => {
      $scope.newCategory.id =
        Math.max.apply(
          Math,
          $rootScope.categories.map(function (category) {
            return category.id;
          })
        ) + 1;
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.toLocaleDateString("en-US", { month: "long" });
      var year = currentDate.getFullYear();

      $scope.newCategory.createdOn = day + " " + month + " " + year;
      $rootScope.categories.push($scope.newCategory);
      $scope.newCategory = {};
    };

    $scope.selectedCategory = {};
    $scope.selectCategory = (id) => {
      let category = $rootScope.categories.find((category) => {
        return category.id == id;
      });
      $scope.selectedCategory.id = category.id;
      $scope.selectedCategory.title = category.title;
      $scope.selectedCategory.createdOn = category.createdOn;
    };

    $scope.updateCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1, $scope.selectedCategory);
      $scope.selectedCategory = {};
    };

    $scope.deleteCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1);
      $scope.selectedCategory = {};
    };
  })

  // book Controller

  .controller("bookCtrl", function ($scope, $rootScope) {
    $scope.searchType = "title";
    $scope.searchText = "";

    $scope.selectedBook = {};
    $scope.selectBook = (id) => {
      let book = $rootScope.books.find((book) => {
        return book.id == id;
      });
      $scope.selectedBook.id = book.id;
      $scope.selectedBook.title = book.title;
    };

    $scope.deleteBook = () => {
      let index = $rootScope.books.findIndex((book) => {
        return book.id == $scope.selectedBook.id;
      });
      $rootScope.books.splice(index, 1);
      $scope.selectedBook = {};
    };
  })
  .controller(
    "bookDetailCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.bookId = $routeParams.id;
    }
  )

  .controller("bookAddCtrl", function ($scope, $rootScope, $location) {
    if (!$rootScope.books) {
      $rootScope.books = [];
    }
    var newBookId = $rootScope.books.length + 1;
    $scope.addBook = function () {
      var newBook = {
        id: newBookId,
        title: $scope.title,
        author: $scope.author,
        publisher: $scope.publisher,
        language: $scope.language,
        category: $scope.category,
        edition: $scope.edition,
        ISBN: $scope.isbn,
        pages: $scope.pages,
        price: $scope.price,
        image: $scope.featuredImage,
        description: $scope.description,
      };
      $rootScope.books.push(newBook);
      $location.path("/books");
    };
    $scope.submitForm = function () {
      $scope.addBook();
    };
    $scope.updateButton = function() {
      $scope.selectedCategory = $scope.category;
  };
  })

  .controller("bookEditCtrl", function ($scope, $rootScope, $routeParams , $location) {
    $scope.bookId = $routeParams.id;
    

    $scope.updateBook = function () {
        $rootScope.books[index] = {
            id: $scope.bookId,
            title: $rootScope.books[index].title,
            author: $rootScope.books[index].author,
            publisher: $rootScope.books[index].publisher,
            language: $rootScope.books[index].language,
            category: $rootScope.books[index].category,
            edition: $rootScope.books[index].edition,
            ISBN: $rootScope.books[index].ISBN,
            pages: $rootScope.books[index].pages,
            price: $rootScope.books[index].price,
            image: $rootScope.books[index].image,
            description: $rootScope.books[index].description
        };

        $location.path('#!/books');
    };

    $scope.submitForm = function () {
        $scope.updateBook();
    };
});

