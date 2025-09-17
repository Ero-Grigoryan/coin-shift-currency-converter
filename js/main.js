"use strict";

import DomBuilder, { createRootElement } from "./modules/DomBuilder.module.js";
import EventHandler from "./modules/EventHandler.module.js";
import fetchData from "./utils/fetchData.js";

const rootElement = createRootElement();
const domBuilder = new DomBuilder(rootElement);
const eventHandler = new EventHandler(domBuilder);

await domBuilder.loadStyles("/assets/data/styles.json");

const { rateSwitchOptions, currencySwitchOptions, currencies } = await fetchData(
  "../assets/data/converter.json",
);
const images = await fetchData("../assets/data/images.json");

const header = domBuilder.createHeader();

const logoContainer = domBuilder.createFigure("logo-container");
const logoImage = domBuilder.createImage(images.logo.src, images.logo.alt, images.logo.elementName);
const logoCaption = domBuilder.createFigcaption("CoinShift", "logo-caption");

const pageHeading = domBuilder.createHeading(1, "Currency Converter", "page-heading");

const converterWrapper = domBuilder.createContainer("converter-wrapper");

const currencyRatesContainer = domBuilder.createContainer("currency-rates-container");

const rateSwitchContainer = domBuilder.createContainer("rate-switch-container");
const rateSwitchLabel = domBuilder.createLabel("rate-switch-label", "rate-switch", "Select option");
const rateSwitch = domBuilder.createSelect("rate-switch");
const rateOptions = domBuilder.createOptions(rateSwitchOptions);

const currenciesContainer = domBuilder.createContainer("currencies-container");

const currencyCards = domBuilder.createCurrencyCards(
  "currency-container",
  currencies,
  images.flags,
  "buyRate",
);

const converterContainer = domBuilder.createContainer("converter-container");

const converterLeftColumn = domBuilder.createContainer("converter-column");

const converterHaveLabel = domBuilder.createLabel("converter-label", "converter-select", "Have");
const converterHaveSelect = domBuilder.createSelect("converter-select");
const converterHaveOptions = domBuilder.createOptions(currencySwitchOptions);
const converterHaveInput = domBuilder.createInput(
  "number",
  "have",
  "Currency #1",
  "converter-input",
);

const converterMiddleColumn = domBuilder.createContainer("converter-middle-column");

const switchCurrencyIcon = domBuilder.createImage(
  images.switchIcon.src,
  images.switchIcon.alt,
  images.switchIcon.elementName,
);

const converterRightColumn = domBuilder.createContainer("converter-column");

const converterWantLabel = domBuilder.createLabel("converter-label", "converter-select", "Want");
const converterWantSelect = domBuilder.createSelect("converter-select");
const converterWantOptions = domBuilder.createOptions(currencySwitchOptions);
const converterWantInput = domBuilder.createInput(
  "number",
  "income",
  "Currency #2",
  "converter-input",
);

domBuilder.appendElement(logoContainer, logoImage, logoCaption);
domBuilder.appendElement(header, logoContainer);
domBuilder.appendElement(document.body, header);

domBuilder.appendElement(domBuilder.rootElement, pageHeading);

domBuilder.appendElement(rateSwitch, ...rateOptions);
domBuilder.appendElement(rateSwitchContainer, rateSwitchLabel, rateSwitch);

domBuilder.appendElement(currenciesContainer, ...currencyCards);

domBuilder.appendElement(currencyRatesContainer, rateSwitchContainer, currenciesContainer);

domBuilder.appendElement(converterHaveSelect, ...converterHaveOptions);

domBuilder.appendElement(converterWantSelect, ...converterWantOptions);

domBuilder.appendElement(
  converterLeftColumn,
  converterHaveLabel,
  converterHaveSelect,
  converterHaveInput,
);

domBuilder.appendElement(converterMiddleColumn, switchCurrencyIcon);

domBuilder.appendElement(
  converterRightColumn,
  converterWantLabel,
  converterWantSelect,
  converterWantInput,
);

domBuilder.appendElement(
  converterContainer,
  converterLeftColumn,
  converterMiddleColumn,
  converterRightColumn,
);

domBuilder.appendElement(converterWrapper, currencyRatesContainer, converterContainer);
domBuilder.appendElement(domBuilder.rootElement, converterWrapper);

domBuilder.renderRoot();
eventHandler.initializeEventListeners();
