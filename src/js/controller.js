import * as model from "./model";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";
import "../scss/main.scss";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";
import BookmarksView from "./views/BookmarksView";
import AddRecipeView from "./views/AddRecipeView";
import { MODAL_CLOSE_SEC } from "./config";
import FilterView from "./views/FilterView";

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    let query = SearchView.getQuery();
    if (!query) return;
    
    await model.loadSearchResults(query);

    ResultsView.render(model.getSearchResult());

    FilterView.render();
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    ResultsView.renderError();
  }
};

const controlFiltering = async function (filterBy) {
  try {
    if (filterBy === "filterByCT") {
      ResultsView.renderSpinner();
      await model.filterByCT(model.state.search.results)
      ResultsView.render(model.getSearchResult())
    };
    if (filterBy === "filterByIng") {
      ResultsView.renderSpinner();
      await model.filterByIng(model.state.search.results)
      ResultsView.render(model.getSearchResult())
    };
  } catch (err) {
    console.error(err);
  }
}

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
    console.error(err);
    RecipeView.renderError();
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

const controlUploadRecipe = async function (newRecipe) {
  try {
    AddRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    RecipeView.render(model.state.recipe);

    AddRecipeView.renderMessage();

    BookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    AddRecipeView.renderError(err);
  }
};

(function () {
  SearchView.addSearchHandler(controlSearchResults);
  FilterView.addHandlerFilterbyCT(controlFiltering);
  FilterView.addHandlerFilterbyIng(controlFiltering)
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerUpdateBookmark(controlUpdateBookmarks);
  BookmarksView.addHandlerRender(controlBookmarks);
  PaginationView.addEventHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlUploadRecipe);
}
)()
