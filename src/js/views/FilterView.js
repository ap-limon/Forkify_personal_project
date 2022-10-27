import icons from "../../img/icons.svg";

class FilterView {
  _parentEl = document.querySelector(".dropdown");

  constructor() {
    this._dropdownToggler();
  }

  render() {
    this._parentEl.innerHTML = "";
    const markup = this._generateMarkUp();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _dropdownToggler() {
    this._parentEl.addEventListener("click", function (e) {
      let dropBtn = e.target.closest(".sort--btn");
      let dropdownList = this.querySelector(".dropdown-list");
      if (!dropBtn) return;
      dropdownList.classList.toggle("hidden");
    });
  }

  addHandlerFilterbyCT(handler) {
    this._parentEl.addEventListener("click", function (e) {
      let filterBtn = e.target.closest(".filterByCT");
      if (!filterBtn) return;
      handler("filterByCT");
    });
  }

  addHandlerFilterbyIng(handler) {
    this._parentEl.addEventListener("click", function (e) {
      let filterBtn = e.target.closest(".filterByIng");
      if (!filterBtn) return;
      handler("filterByIng");
    });
  }

  _generateMarkUp() {
    return `
      <button class="btn btn--small sort--btn">
        <svg>
          <use href="${icons}#icon-filter"></use>
        </svg>
        <span>Sort by</span>
      </button>
      <ul class="dropdown-list hidden" id="dropdown">
        <li class="filterByCT btn btn--small">
          <svg>
            <use href="${icons}#icon-arrow-down"></use>
          </svg>
          <span>Cooking time Low to High</span>
        </li>
        <li class="filterByIng btn btn--small">
          <svg>
            <use href="${icons}#icon-arrow-down"></use>
          </svg>
          <span>Ingredients Low to High</span>
        </li>
      </ul>
    `;
  }
}

export default new FilterView();
