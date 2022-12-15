import { Map, View, Feature } from 'ol';
import { Vector as VectorLayer, VectorSource } from 'ol/layer';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  template: '<div id="map"></div>',
  styleUrls: ['./map.component.css']
})
export class MapXXComponent implements OnInit {

  map: Map;

  ngOnInit() {

    vectorSource = new VectorSource();
    vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 0
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ]
    });


    this.mapService.getUserLines().subscribe(lines => {
      // Adiciona os pontos novos às linhas já existentes
      lines.forEach(line => {
        const existingLine = this.vectorLayer.getSource().getFeatures().find(f => f.getId() === line.getId());

        const existingLine = this.vectorSource.getFeatures().find(f => {
            const coordinates = f.getGeometry().getCoordinates();
            const [startPoint] = coordinates;

            return startPoint.equals(line3StartPoint);
          });

        if (existingLine) {
          // Adiciona os pontos novos à linha existente
          existingLine.getGeometry().appendCoordinate(line.getGeometry().getCoordinates()[0]);
        } else {
          // Adiciona a nova linha ao mapa
          this.vectorLayer.getSource().addFeature(line);
        }
      });
    });


  }

}





// const line1 = this.vectorSource.getFeatures().find(f => f.getId() === '1');
// const line3 = new Feature({
//   geometry: new LineString([
//     [0, 0],
//     [1, 1],
//     [2, 2]
//   ])
// });

// line1.setGeometry(line3.getGeometry());
