import View from "./View";
import PreviewView from "./PreviewView";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find recipe and bookmark it;";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkUp() {    
    return this._data.map((bookmark) => PreviewView.render(bookmark, false) ).join("");
  };
};

export default new BookmarksView();