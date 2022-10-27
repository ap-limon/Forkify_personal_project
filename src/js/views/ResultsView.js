import PreviewView from "./PreviewView";
import icons from "../../img/icons.svg";
import View from "./View";
import FilterView from "./FilterView";

class ResultsView extends View {
  _errorMessage =
    "No recipes found for you query. Please try with another name!";
  _parentEl = document.querySelector(".results");


  _generateMarkUp() {
    return `
    ${this._data.map((result) => PreviewView.render(result, false)).join("")}`;
  }
};

export default new ResultsView();
