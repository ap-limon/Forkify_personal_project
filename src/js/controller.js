import "../scss/main.scss";
import icons from "../img/icons.svg";
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const renderSpinner = (parentEl) => {
  let markUp = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markUp);
};

const renderError = (parentEl, message) => {
  let markUp = `
  <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message} 😔😔😔 No recipes found for your ID. Please try again</p>
  </div>
  `;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markUp);
};

const showRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;

    renderSpinner(recipeContainer);
    const data = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    ).then((res) => res.json());
    if (data.status === "fail") {
      throw data.message;
    }
    const { recipe } = data.data;

    let markUp = `
  <figure class="recipe__fig">
    <img
      src=${recipe.image_url}
      alt=${recipe.title}
      class="recipe__img"
    />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">
        ${recipe.cooking_time}
      </span>
      <span class="recipe__info-text"> minutes </span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people"> ${
        recipe.servings
      } </span>
      <span class="recipe__info-text"> servings </span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${recipe.ingredients
      .map((ingredient) => {
        return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity ? ingredient.quantity : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit"> ${ingredient.unit}</span> ${
          ingredient.description
        }
        </div>
      </li>
      `;
      })
      .join("")}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher"> ${recipe.publisher}</span>. Please check
      out directions at their website
    </p>
    <a
      href=${recipe.source_url}
      class="btn--small recipe__btn"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;

    recipeContainer.innerHTML = " ";
    recipeContainer.insertAdjacentHTML("afterbegin", markUp);
  } catch (err) {
    renderError(recipeContainer, err)
  }
};

["hashchange", "load"].forEach((ev) => {
  window.addEventListener(ev, showRecipe);
});
