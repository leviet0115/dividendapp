import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let greeting = "Hello";
console.log(`${greeting} from index.js`);

const data = [];

const process = (raw) => {
  return raw.map((element) => {
    return {
      ...element,
      yield: getDivYield(element),
      average: getAvgDiv(element),
      weightedAverage: getWeightAvgDiv(element),
      lastYearYield: element.dividendHistory[0].dividend,
    };
  });
};

const saveAndPrint = (content) => {
  for (let share of content) {
    data.push(share);
    console.log(share);
  }
};

fetch(
  "https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json"
)
  .then((response) => response.json())
  .then((body) => process(body))
  .then((proData) => saveAndPrint(proData))
  .catch((err) => console.error(err));

const getDivYield = (share) => {
  const divYield = share.dividendHistory[0].dividend / share.price;
  return divYield.toFixed(2);
};

const getAvgDiv = (share) => {
  const sum = share.dividendHistory
    .slice(0, 5)
    .reduce((total, element) => total + element.dividend, 0);
  const avgDiv = sum / 5;
  return avgDiv.toFixed(2);
};

const getWeightAvgDiv = (share) => {
  const weights = [3, 2, 1, 1, 1];
  const sum = share.dividendHistory
    .slice(0, 5)
    .reduce(
      (total, element, index) => total + element.dividend * weights[index],
      0
    );
  const totalWeights = weights.reduce((total, element) => total + element, 0);
  const weightAvgDiv = sum / totalWeights;
  return weightAvgDiv.toFixed(2);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
