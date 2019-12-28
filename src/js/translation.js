import { HttpHandler } from "./httpHandler";
const Http = new HttpHandler();

export class Translation{
  constructor() {

  }

  translateAttribute(sourceObject, targetElementArr, attribute) {
    targetElementArr.forEach((singleEl, index) => {
      singleEl.setAttribute(attribute, sourceObject[index]);
  });
  }


  async translateFromJSON(lang, filePath, targetElementsArr, atrtribute) {
    const sourceData = await Http.get(filePath);
    const translatedData = sourceData[lang];

    await targetElementsArr.forEach(singleEl => {
      const key = singleEl.getAttribute(atrtribute);
      singleEl.innerText = translatedData[key];
    });
  }
}