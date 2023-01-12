import { Component, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style';

@Component({
  selector: 'app-map-circle',
  template: '<div id="map"></div>',
  styles: [`
    #map {
      height: 300px;
      width: 100%;
    }
  `]
})
export class MapCircleComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Create a new vector layer
    let vectorLayer = new VectorLayer({
      source: new VectorSource()
    });

    // create a new circle geometry
    let circle = new Circle([-5537854.075262995, -2472336.4872737266], 1000000);

    // Create a new feature from the circle geometry
    let feature = new Feature(circle);

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
        center: [-5537854.075262995, -2472336.4872737266],
        zoom: 2
      })
    });

    // set the style for the circle
    // feature.setStyle(new Style({
    //   fill: new Fill({
    //     color: 'rgba(255, 255, 255, 0.2)'
    //   }),
    //   stroke: new Stroke({
    //     color: '#ffcc33',
    //     width: 2
    //   }),
    //   image: new Circle({
    //     radius: 7,
    //     fill: new Fill({
    //       color: '#ffcc33'
    //     })
    //   })
    // }));

    feature.setStyle(new Style({
      fill: new Fill({
          color: 'rgba(255, 0, 0, 0.2)'
      }),
      stroke: new Stroke({
          color: '#ffcc33',
          width: 2
      }),
      image: new CircleStyle({
          radius: 7,
          fill: new Fill({
              color: '#ffcc33'
          })
      })
    }));













  }
}
