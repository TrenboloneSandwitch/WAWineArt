const loadGoogleMapsApi = require("load-google-maps-api");
import { HttpHandler } from "./httpHandler";

class InfoWindow {
  constructor(contentHTML) {
    this.contentHTML = contentHTML;
  }

  createInfoWindow() {
    const contentString = this.contentHTML;

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    return infowindow;
  }
}

class Marker {
  constructor(position, myMap, img, myTitle) {
    this.position = position;
    this.myMap = myMap;
    this.img = img;
    this.myTitle = myTitle;
  }

  createMarker() {
    const markerOption = {
      position: this.position,
      map: this.myMap,
      icon: this.img,
      title: this.myTitle
    };
    const marker = new google.maps.Marker(markerOption);
    return marker;
  }
}

class Map {
  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({
      key: ""
    });
  }
  static async createMap(googleMaps, mapElement, centerPos) {

    const lang = localStorage.getItem('siteLang');

    const mapOption = {
      zoom: 16,
      center: centerPos,
      disableDefaultUI: true,
      gestureHandling: "none",
      zoomControl: false
    };

    const http = new HttpHandler();
    const data = await http.get("../../assets/data/mapoptions.json");
    const styledMap = new google.maps.StyledMapType(data.options, {
      name: "Styled Map"
    });

    const map = new googleMaps.Map(mapElement, mapOption);
    map.mapTypes.set("styled_map", styledMap);
    map.setMapTypeId("styled_map");

    const mainMarker = new Marker(
      centerPos,
      map,
      "assets/img/wine-locator.png",
      "WA Wine & Art s.r.o."
    ).createMarker();

    const texts = (lang === 'cs') ? [' Zde sídlíme, budeme moc rádi, když nás přijedete navštívit na jednu z námi konaných degustací.', 'NAVIGOVAT', 'Město kde se nacházíme'] : ['Here is our company located. It\'ll be our pleasure if you come to visit us on one of our events.', 'NAVIGATE', 'City where we are based' ];

    const infoW = new InfoWindow(`
    <div class="infowindow">
      <h2 class="infowindow__heading">WA Wine & ART s.r.o.</h2>
      <p class="infowindow__text"> ${texts[0]}
      </p>
      <p class="infowindow__adress">
        <span>Masarykova 577,</span> 
        <span>Milevsko,</span>
        <span>399 01</span> 
        
      </p>
      
      <button onclick="location.href='https://goo.gl/maps/Kbaabi23GLo'" class="infowindow__button">
      ${texts[1]}
      </button>
    </div>`).createInfoWindow();

      mainMarker.addListener('click', () => {
        infoW.open(map, mainMarker);
        
      });


    new Marker(
      { lat: 49.4574, lng: 14.3633936 },
      map,
      "assets/img/mil_marker.png",
      texts[2]
    ).createMarker();

    /* const marker = this.createMarker(centerPos, map, "img/wine-locator.png", "WA Wine & Art s.r.o.");
  
  marker.addListener("click", () => {
    console.log('clciked');
    
}); */

    /* return new googleMaps.Map(mapElement, {
      center:  centerPos,
      zoom: 14
    }); */
  }

  /*createMap(infowindow) {
    http.get('../data/mapOptions.json')
        .then(data => {
            const mapOptionsData = data.options;
            // Načte a vytvoří stylovanou mapu uloženou v JSONu
            const styledMapType = new google.maps.StyledMapType(mapOptionsData, {
                name: "Styled Map"
            });

            const mapOption = {
                zoom: 16,
                center: this.centerPosition,
                disableDefaultUI: true,
                gestureHandling: "none",
                zoomControl: false
            };

            // The map, centered at WineArt
            const map = new google.maps.Map(document.getElementById("mapID"), mapOption);
            map.mapTypes.set("styled_map", styledMapType);
            map.setMapTypeId("styled_map");
            // The marker, positioned at WineArt
            const marker = this.createMarker(this.centerPosition, map, "img/wine-locator.png", "WA Wine & Art s.r.o.");
            const milPos = {
                lat: 49.4574,
                lng: 14.3633936
            };
            this.createMarker(milPos, map, "img/mil_mark1.png", "Město kde se nacházíme")

            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });
        })
        .catch(err => console.log(err));
}*/

  /* createMarker(position, myMap, img, myTitle) {
  console.log(1);
  
    const markerOption = {
        position: position,
        map: myMap,
        icon: img,
        title: myTitle
    };
    const marker = new google.maps.Marker(markerOption);
    return marker;
}

createInfoWindow(lang) {
    const texts = (lang === 'cs') ? [' Zde sídlíme, budeme moc rádi, když nás přijedete navštívit na jednu z námi konaných degustací.', 'NAVIGOVAT'] : ['Here is our company located. It\'ll be our pleasure if you come to visit us on one of our events', 'NAVIGATE' ];
    //info window contet
    const contentString =
        `
      <div style="width:auto; height:auto; background-color: white;text-align: center;">
        <h3 style="font-weight: 100;">WA Wine & ART s.r.o.</h3>
        <p style="text-align: left">
        ${texts[0]}
        </p>
        <p style="text-align: left; font-weight:500;">
          Masarykova 577, 399 01 Milevsko
        </p>
        
        <button onclick="location.href='https://goo.gl/maps/Kbaabi23GLo'" style="cursor:pointer;width: auto;font-size: 1.5em;font-weight: 100;padding: auto;border: 2px solid #154070;background-color: #154070;color: #cdb877;;">
          ${texts[1]}
        </button>
      </div>`;

    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    return infowindow;
} */
}

export { Map };
