export class Bottle {
  constructor(data, supplierLogo) {
    this.data = data;
    this.supplierLogo = supplierLogo;
  }
  get() {
    const bottle = this.createElement("div", "bottle column");
    const head = this.createElement("div", "bottle__head");
    const bgImg = this.createElement("img", "bottle__bg-image");
    bgImg.setAttribute("src", `../../assets/${this.supplierLogo}`);
    const botImg = this.createElement("img", "bottle__image");
    botImg.setAttribute("src", `../../assets/${this.data.img}`);
    head.append(bgImg, botImg);

    const body = this.createElement("div", "bottle__body");
    const heading = this.createElement("h3", "bottle__heading");
    heading.innerText = this.data.name;
    const basicInfo = this.createElement("div", "bottle__basic-info column");

    const speciesCont = this.createElement("div", "bottle__species row");
    const speciesHeading = this.createElement("span", "bold");
    speciesHeading.innerHTML = "odrůda: &nbsp";
    const speciesList = this.createElement("ul", "bottle__species-list");
    this.data.species.forEach(specie => {
      let sp = this.createElement("li");
      sp.innerText = specie;
      speciesList.appendChild(sp);
    });
    speciesCont.append(speciesHeading, speciesList);

    const dosageCont = this.createElement("div", "bottle__dosage");
    const dosageHeading = this.createElement("span", "bold");
    dosageHeading.innerHTML = "dosage: &nbsp";
    const dosage = this.createElement("span");
    dosage.innerText = `${this.data.dosage} g/l`;
    dosageCont.append(dosageHeading, dosage);

    basicInfo.append(speciesCont, dosageCont);

    const additionalInfo = this.createElement("ul", "bottle__more-info");
    this.data.description.forEach(record => {
      let rec = this.createElement("li");
      rec.innerHTML = '- ' + record;
      additionalInfo.appendChild(rec);
    });

    body.append(heading, basicInfo, additionalInfo);
    bottle.append(head,body);

    return bottle;
  }

  createElement(elName, cls = null) {
    const element = document.createElement(elName);
    if (cls !== null) element.className = cls;
    return element;
  }
}
