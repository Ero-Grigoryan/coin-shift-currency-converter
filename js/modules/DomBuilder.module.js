"use strict";

export const createRootElement = () => {
  const rootElement = document.createElement("main");
  rootElement.id = "app";

  return rootElement;
};

export default class DomBuilder {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.styles = null;
  }

  async loadStyles(src) {
    try {
      const response = await fetch(src);

      if (!response.ok) {
        throw new Error(`Failed to fetch styles: ${response.status} ${response.statusText}`);
      } else {
        this.styles = await response.json();
      }
    } catch (error) {
      console.error("Error loading styles:", error.message);

      this.styles = {};
    }
  }

  applyStyles(element) {
    const { elementName } = element.dataset;

    element.style.cssText = this.styles[elementName];
  }

  createHeader() {
    const header = document.createElement("header");
    header.dataset.elementName = "header";

    this.applyStyles(header);

    return header;
  }

  createFigure(elementName) {
    const figure = document.createElement("figure");
    figure.dataset.elementName = elementName;

    this.applyStyles(figure);

    return figure;
  }

  createFigcaption(caption, elementName) {
    const figcaption = document.createElement("figcaption");
    figcaption.dataset.elementName = elementName;

    figcaption.innerText = caption;

    this.applyStyles(figcaption);

    return figcaption;
  }

  createImage(imageSrc, imageAlternateText, elementName) {
    const image = document.createElement("img");
    image.setAttribute("src", imageSrc);
    image.setAttribute("alt", imageAlternateText);
    image.dataset.elementName = elementName;

    this.applyStyles(image);

    return image;
  }

  createHeading(level, caption, elementName) {
    const heading = document.createElement(`h${level}`);
    heading.dataset.elementName = elementName;

    heading.innerText = caption;

    this.applyStyles(heading);

    return heading;
  }

  createContainer(elementName) {
    const container = document.createElement("div");
    container.dataset.elementName = elementName;

    this.applyStyles(container);

    return container;
  }

  createMultipleContainers(elementName, iterationList) {
    const containers = iterationList.map(() => {
      const container = document.createElement("div");
      container.dataset.elementName = elementName;

      this.applyStyles(container);

      return container;
    });

    return containers;
  }

  createSpan(text, elementName, additionalData = {}) {
    const span = document.createElement("span");
    span.dataset.elementName = elementName;

    if (Object.keys(additionalData).includes("currencyName")) {
      span.dataset.currencyName = additionalData.currencyName;
    }

    span.innerText = text;

    this.applyStyles(span);

    return span;
  }

  createLabel(elementName, target, text) {
    const label = document.createElement("label");
    label.setAttribute("for", target);
    label.dataset.elementName = elementName;

    label.innerText = text;

    this.applyStyles(label);

    return label;
  }

  createSelect(elementName) {
    const select = document.createElement("select");
    select.setAttribute("name", elementName);
    select.setAttribute("id", elementName);
    select.dataset.elementName = elementName;

    this.applyStyles(select);

    return select;
  }

  createOptions(optionsList) {
    const options = optionsList.map(({ optionName, optionValue, elementName }) => {
      const option = document.createElement("option");
      option.setAttribute("value", optionValue);
      option.dataset.elementName = elementName;

      option.innerText = optionName;

      this.applyStyles(option);

      return option;
    });

    return options;
  }

  createCurrencyCards(elementName, currencyList, currencyFlags, selectedOption) {
    const currencyCards = currencyList.map((currency) => {
      const flagImage = currencyFlags.find((flag) => flag.currencyName === currency.currencyName);

      const currencyCardContainer = this.createContainer(elementName);

      const currencyLeftContainer = this.createContainer("currency-card-left");

      const currencyFlagImage = this.createImage(
        flagImage.src,
        flagImage.alt,
        flagImage.elementName,
      );
      const currencyCaption = this.createSpan(currency.currencyName, "currency-name");

      const currencyRate = this.createSpan(currency[selectedOption], `currency-rate`, {
        currencyName: currency.currencyName,
      });

      this.appendElement(currencyLeftContainer, currencyFlagImage, currencyCaption);

      this.appendElement(currencyCardContainer, currencyLeftContainer, currencyRate);

      return currencyCardContainer;
    });

    return currencyCards;
  }

  appendElement(parent, ...childList) {
    parent.append(...childList);
  }

  renderRoot() {
    document.body.appendChild(this.rootElement);
  }
}
