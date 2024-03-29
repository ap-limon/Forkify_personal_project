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

  renderError(error = this._errorMessage) {
    let markUp = `
    <div class="error">
        <div>
        <svg>
            <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${error}</p>
    </div>
    `;
    this._clean();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  renderMessage(message=this._message) {
    const markUp = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div
    `;

    this._clean();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    
    this._data = data;
    let markUp = this._generateMarkUp();

    if (!render) return markUp;

    this._clean();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newEl = Array.from(newDOM.querySelectorAll("*"));

    const curEl = Array.from(this._parentEl.querySelectorAll("*"));
    
    if (curEl.length === 0) return;

    newEl.forEach((nEl, i) => {
      
      const cEl = curEl[i];

      if (!nEl.isEqualNode(cEl) && nEl.firstChild?.nodeValue.trim() !== "") {
        cEl.textContent = nEl.textContent;
      }

      if (!nEl.isEqualNode(cEl)) {
        Array.from(nEl.attributes).forEach(attr => cEl.setAttribute(attr.name, attr.value));
      }
    });
  }
}

export default View;
