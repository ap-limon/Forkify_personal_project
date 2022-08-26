import * as model from "./model";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/searchView";
import "../scss/main.scss";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";
import BookmarksView from "./views/BookmarksView";
// const recipeContainer = document.querySelector(".recipe");

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    let query = SearchView.getQuery();
    if (!query) return;
    
    await model.loadSearchResults(query);

    ResultsView.render(model.getSearchResult());
    
    PaginationView.render(model.state.search);
  } catch (err) {
    ResultsView.renderError(err);
  }
};

const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();

    ResultsView.update(model.getSearchResult());

    BookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
    console.error(err);
  }
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  
  RecipeView.update(model.state.recipe);
}

const controlUpdateBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  RecipeView.update(model.state.recipe);

  BookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
}

const controlPagination = function (gotoPage) {
  ResultsView.render(model.getSearchResult(gotoPage));
  PaginationView.render(model.state.search);
};

(function () {
  SearchView.addSearchHandler(controlSearchResults);
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerUpdateBookmark(controlUpdateBookmarks);
  BookmarksView.addHandlerRender(controlBookmarks);
  PaginationView.addEventHandlerClick(controlPagination);
}
)()
