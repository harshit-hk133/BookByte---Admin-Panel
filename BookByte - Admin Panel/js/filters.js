angular.module("filters", []).filter("searchFilter", () => {
  return (data, searchType, searchText) => {
    if (!searchText) {
      return data;
    }

    let keyword = RegExp(searchText, "i");
    return data.filter((item) => {
      switch (searchType) {
        case "title":
          return keyword.test(item.title);
        case "createdOn":
          return keyword.test(item.createdOn);
        case "category":
          return keyword.test(item.category);
        case "edition":
          return keyword.test(item.edition);
      }
    });
  };
});
