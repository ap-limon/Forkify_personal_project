import View from "./View";
import icons from "../../img/icons.svg";

class PreviewView extends View {
  _parentEl = "";

  _generateMarkUp() {
    let id = window.location.hash.slice(1);

    return `
            <li class="preview">
                <a href="#${this._data.id}" class="${this._data.id === id ? "preview__link--active" : ""} preview__link">
                    <figure class="preview__fig">
                        <img
                            src="${this._data.image_url}"
                            alt="${this._data.title}"
                        />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${this._data.title}</h4>
                        <p class="preview__publisher">${this._data.publisher}</p>
                        <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `;
  }
};

export default new PreviewView();
