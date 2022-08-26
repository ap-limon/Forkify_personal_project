import View from "./View";
import icons from "../../img/icons.svg";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find recipe and bookmark it;";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkUp() {
    let id = window.location.hash.slice(1);
    
    return this._data
      .map((rec) => {
        return `
        <li class="preview">
            <a href="#${rec.id}" class="${
          rec.id === id ? "preview__link--active" : ""
        } preview__link">
                <figure class="preview__fig">
                    <img
                        src="${rec.image_url}"
                        alt="${rec.title}"
                    />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${rec.title}</h4>
                    <p class="preview__publisher">${rec.publisher}</p>
                    <div class="preview__user-generated">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
        `;
      })
      .join("");
  }
}

export default new BookmarksView();