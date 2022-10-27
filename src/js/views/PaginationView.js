import View from "./View";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addEventHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".page-btn");
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkUp() {
    let curPage = this._data.page;
    let numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    let numOfRestPage = `${curPage} out of ${numPage}`;

    if (curPage === 1 && numPage > 1) {
      return `
        <button data-goto=${
          curPage + 1
        } class="btn--inline page-btn pagination__btn--next">
            <span>page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        <button class="btn--inline">
          <span>${numOfRestPage}</span>
        </button>
        `;
    }

    if (curPage < numPage) {
      return `
        <button data-goto=${
          curPage + 1
        } class="btn--inline page-btn pagination__btn--next">
            <span>page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        <button class="btn--inline">
          <span>${numOfRestPage}</span>
        </button>
        <button data-goto=${
          curPage - 1
        } class="btn--inline page-btn pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }

    if (curPage === numPage && numPage > 1) {
      numOfRestPage = "No more";
      return `
        <button class="btn--inline">
          <span>${numOfRestPage}</span>
        </button>

        <button data-goto=${
          curPage - 1
        } class="btn--inline page-btn pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
          `;
    }

    return "";
  }
}

export default new PaginationView();
