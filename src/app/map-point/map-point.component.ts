import { Component, AfterViewInit } from '@angular/core';
import {fromLonLat} from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-map-point',
  template: '<div id="map"></div>',
  styles: [`
    #map {
      height: 300px;
      width: 100%;
    }
  `]
})
export class MapPointComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Create a new vector layer
    let vectorLayer = new VectorLayer({
      source: new VectorSource()
    });

    let point = fromLonLat([-49.74738957032327, -21.67322142286088]);
    let pointGeometry = new Point(point);

    // Create a new feature from the point geometry
    let feature = new Feature(pointGeometry);

    // Add the feature to the vector layer's source
    vectorLayer.getSource()?.addFeature(feature);

    // create the map
    let map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: point,
        zoom: 2
      })
    });

    // set the style for the point
    feature.setStyle(new Style({
      image: new Icon({
        // src: 'https://www.freepnglogos.com/uploads/pin-png/flat-design-map-pin-transparent-png-stickpng-31.png',
        src: 'assets/imgs/point.png',
        scale: 0.05
        // imgSize: [100, 100]
      })
    }));
  }
}
