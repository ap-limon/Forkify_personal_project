import icons from "../../img/icons.svg";

class View {
  _data;

  _clean() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    let markUp = `
    <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
    `;
    this._clean();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  renderError() {
    let markUp = `
    <div class="error">
        <div>
        <svg>
            <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${this._errorMessage}</p>
    </div>
    `;
    this._clean();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  render(data) {
    this._data = data;
    let markUp = this._generateMarkUp();
    this._clean();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
}

export default View;