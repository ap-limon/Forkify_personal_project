import * as model from "./model";
import RecipeView from "./views/recipeView";
import SearchView from "./views/searchView";
import "../scss/main.scss";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";
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
    let query = SearchView.getQuery();
    if (!query) return;
    
    ResultsView.renderSpinner();
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

    ResultsView.update(model.getSearchResult())

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

const controlPagination = function (gotoPage) {
  ResultsView.render(model.getSearchResult(gotoPage));
  PaginationView.render(model.state.search);
};

RecipeView.addHandlerRender(controlRecipe);
RecipeView.addHandlerUpdateServings(controlServings);
PaginationView.addEventHandlerClick(controlPagination);
SearchView.addSearchHandler(controlSearchResults);
