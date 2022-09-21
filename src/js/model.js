export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
  bookmarks: [],
};

export const getSearchResult = function (page = state.search.page) {
  state.search.page = page;

  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const loadSearchResults = async function (query) {
  try {
    state.query = query;
    const data = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=ae0cef27-38c5-4736-8c2a-2f381e8b0688`
    ).then((res) => res.json());

    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        image_url: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
        ...(rec.key && {key: rec.key})
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    ).then((res) => res.json());
    if (data.status === "fail") throw new Error();

    const { recipe } = data.data;

    state.recipe = {
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      id: recipe.id,
      ...(recipe.key && { key: recipe.key }),
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  if ((id = state.recipe.id)) state.recipe.bookmarked = false;
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());

        if (ingArr.length !== 3) {
          throw new Error(
            "Wrong ingredient format! Please use the correct format :)"
          );
        }

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const uploadingRecipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes?key=ae0cef27-38c5-4736-8c2a-2f381e8b0688",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadingRecipe),
      }
    ).then((res) => res.json());
    if (data.status === "fail") throw new Error(`${data.message}`);

    const { recipe } = data.data;

    state.recipe = {
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      id: recipe.id,
      ...(recipe.key && {key: recipe.key}),
    };

    addBookmark(state.recipe);
    console.log(state.recipe);

  } catch (err) {
    throw `🔥🔥${err}`;
  }
};
