"use strict";

import fetchData from "../utils/fetchData.js";

export default class DomBuilder {
  constructor(domBuilder) {
    this.domBuilder = domBuilder;
  }

  handleOptionSelection(element) {
    element.addEventListener("change", async (e) => {
      const currencyRateValues = document.querySelectorAll("[data-element-name='currency-rate']");

      const { currencies } = await fetchData("../assets/data/converter.json");

      switch (e.target.value) {
        case "buy":
          currencyRateValues.forEach((elem) => {
            const currentCurrency = currencies.find((currency) => {
              return currency.currencyName === elem.dataset.currencyName;
            });

            elem.innerText = currentCurrency.buyRate;
          });
          break;

        case "sell":
          currencyRateValues.forEach((elem) => {
            const currentCurrency = currencies.find((currency) => {
              return currency.currencyName === elem.dataset.currencyName;
            });

            elem.innerText = currentCurrency.sellRate;
          });
          break;

        default:
          break;
      }
    });
  }

  initializeEventListeners() {
    const rateOptionSelect = document.querySelector("[data-element-name='rate-switch']");

    rateOptionSelect.addEventListener("click", this.handleOptionSelection(rateOptionSelect));
  }
}
