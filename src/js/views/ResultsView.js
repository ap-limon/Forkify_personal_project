import icons from "../../img/icons.svg";
import PreviewView from "./PreviewView";
import View from "./View";

class ResultsView extends View {
  _errorMessage =
    "No recipes found for you query. Please try with another name!";
  _parentEl = document.querySelector(".results");

  _generateMarkUp() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
};

export default new ResultsView();
