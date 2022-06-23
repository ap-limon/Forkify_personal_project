class SearchView {
    #parentEl = document.querySelector(".search");


    _clearInput() {
        this.#parentEl.querySelector(".search__field").value = "";
    }

    getQuery() {
        let query = this.#parentEl.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    
    addSearchHandler(handler) {
        this.#parentEl.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();