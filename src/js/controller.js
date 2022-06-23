import * as model from "./model";
import RecipeView from "./views/recipeView";
import SearchView from "./views/searchView";
import "../scss/main.scss";
import ResultsView from "./views/ResultsView";
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

const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    let query = SearchView.getQuery();
    if (!query) return;

    ResultsView.renderSpinner();
    await model.loadSearchResults(query);
    
    ResultsView.render(model.state.search.results);
  } catch (err) {
    ResultsView.renderError(err);
  }
}

RecipeView.addHandlerRender(controlRecipe);
SearchView.addSearchHandler(controlSearchResults);