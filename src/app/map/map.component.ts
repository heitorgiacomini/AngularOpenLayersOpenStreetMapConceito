import { Component, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Zoom from 'ol/control/Zoom';
const zoomControl = new Zoom();

@Component({
  selector: 'app-map',
  template: '<div id="map"></div>',
  styles: [`
    #map {
      height: 300px;
      width: 100%;
    }
  `]
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit() {
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 1
      }),
      controls: [zoomControl]
    });
  }
}
