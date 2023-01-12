// import { Component, Input } from '@angular/core';
// import { Map, View } from 'ol';
// import { Point } from 'ol/geom';
// import { MultiLineString } from 'ol/geom';
// import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
// import OSM from 'ol/source/OSM';
// import VectorSource from 'ol/source/Vector';

// @Component({
//   selector: 'testemap',
//   template: `
//     <div id="map"></div>
//   `,
//   styles: [`
//     #map {
//       height: 500px;
//       width: 100%;
//     }
//   `]
// })
// export class TestemapComponent {
//   @Input() point: Point;
//   @Input() lines: MultiLineString;

//   map: Map;

//   ngOnInit() {
//     const vectorSource = new VectorSource({
//       features: [this.point, this.lines]
//     });

//     this.map = new Map({
//       target: 'map',
//       layers: [
//         new TileLayer({
//           source: new OSM()
//         }),
//         new VectorLayer({
//           source: vectorSource
//         })
//       ],
//       view: new View({
//         center: this.point.getCoordinates(),
//         zoom: 10
//       })
//     });
//   }
// }

import { Component, Input } from '@angular/core';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from 'ol';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { LineString, MultiLineString, Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
// import * as proj4 from 'proj4';
// import * as proj4x from 'proj4';
import Proj4, { TemplateCoordinates } from 'proj4';
@Component({
  selector: 'testemap',
  template: ` <div id="map" class="map"></div> `,
  styles: [
    `
      .map {
        height: 800px;
        width: 800px;
      }
    `,
  ],
})
export class TestemapComponent {
  @Input() point!: Point;
  @Input() multilinestring!: MultiLineString;

  map!: Map;

  ngOnInit() {
    // Latitude and longitude coordinates in WGS84 datum image.png
    const lon = -46.633309;
    const lat = -23.55052;

    // EPSG:3857 projection definition
    const epsg3857 =
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs';

    // Transform coordinates to EPSG:3857
    const [x, y] = Proj4(Proj4.WGS84, epsg3857, [lon, lat]);

    // Use x and y coordinates in your map

    this.map = new Map({
      view: new View({
        center: [x, y],
        zoom: 2,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
    });

    console.log(this.multilinestring);

    // Create a new MultiLineString object
    let ml = new MultiLineString(
      [
        [
          [ -21.67322142286088, -49.74738957032327],//coordenada de lins conforme vem no google
          [ -49.74738957032327, -21.67322142286088],//coordenada de lins invertida
          [ -46.63330, -23.55052],
        ],
        [
          [-49.74738957032327, -21.67322142286088],
          [-70.023015, -9.136274],//coordenada do acre invertida -9.136274, -70.023015
        ],
      ]
    );

    console.log(ml.getCoordinates());
    console.log(ml);

    // for (let i = 0; i < ml.getCoordinates().length; i++) {
    //   for (let j = 0; j < ml.getCoordinates()[i].length; j++) {
    //       // ml.getCoordinates()[i][j] = fromLonLat(ml.getCoordinates()[i][j]);
    //       ml.getCoordinates()[i][j] = Proj4(Proj4.WGS84, epsg3857, [ ml.getCoordinates()[i][j][0], ml.getCoordinates()[i][j][1]]);
    //       ml.getCoordinates()[i][j](Proj4(Proj4.WGS84, epsg3857, [ ml.getCoordinates()[i][j][0], ml.getCoordinates()[i][j][1]]));
    //       ml[i][j] = (Proj4(Proj4.WGS84, epsg3857, [ ml.getCoordinates()[i][j][0], ml.getCoordinates()[i][j][1]]));

    //       console.log(ml.getCoordinates()[i][j]);
    //       console.log(Proj4(Proj4.WGS84, epsg3857, [ ml.getCoordinates()[i][j][0], ml.getCoordinates()[i][j][1]]));
    //     }
    // }

    let newCoordinates = [];
    for (let i = 0; i < ml.getCoordinates().length; i++) {
        let line = [];
        for (let j = 0; j < ml.getCoordinates()[i].length; j++) {
            line.push(fromLonLat(ml.getCoordinates()[i][j]));
        }
        newCoordinates.push(line)
    }
    ml.setCoordinates(newCoordinates);
    console.log(ml.getCoordinates());

    let feature = new Feature({
      id: 'my-feature',
      geometry: ml,
    });

    let source = new VectorSource({
      features: [feature],
    });

    let vectorLayer = new VectorLayer({
      source: source,
    });

    this.map.addLayer(vectorLayer);
    const features = source.getFeatures();

    // const sourceCrsDef = Proj4.defs('WGS84'); // define the source CRS as a ProjectionDefinition object
    // const targetCrsDef = Proj4.defs('EPSG:3857'); // define the target CRS as a ProjectionDefinition object

    // const targetCrs = Proj4.Proj(targetCrsDef);
    // interface Proj4Proj {
    //   (def: string): typeof Proj4.Proj;
    // }
    // //const sourceCrsDef = Proj4.defs('WGS84'); // define the source CRS as a ProjectionDefinition object
    // const targetCrsDefx = Proj4.defs('EPSG:3857'); // define the target CRS as a ProjectionDefinition object
    // const templateCoordinates = ml.map((line: any[]) => ({
    //   x: line[0],
    //   y: line[1],
    // }));


    // const templateCoordinates: TemplateCoordinates = {
    //   x: [],
    //   y: [],
    // };

    // for (const line of ml) {
    //   for (const coordinate of line) {
    //     templateCoordinates.x.push(coordinate[0]);
    //     templateCoordinates.y.push(coordinate[1]);
    //   }
    // }

    // const transformedMultiLineString = Proj4.transform(
    //   Proj4.WGS84,
    //   targetCrs,
    //   templateCoordinates
    // );

    // Create a Feature with the random MultiLineString

    // Get the features from the VectorSource


    // // Set the id of the Feature
    // feature.setId('my-feature');

    // const vectorLayer = new VectorLayer({
    //   source: new VectorSource({
    //     features: [feature]
    //   })
    // });

    // // create the OpenLayers map
    // this.map = new Map({
    //   target: 'map',
    //   layers: [
    //     new OSM()
    //   ],
    //   view: new View({
    //     center: fromLonLat(this.point.getCoordinates()),
    //     zoom: 10
    //   })
    // });

    // // add the multilinestring as a vector layer to the map
    // const vectorLayer = new VectorLayer({
    //   source: new VectorSource({
    //     features: [
    //       new Feature({
    //         //id: 'my-feature',
    //         geometry: this.multilinestring
    //       })
    //     ]
    //   })
    // });
    // this.map.addLayer(vectorLayer);
  }
}

// const feature = new Feature({
//   geometry: this.multilinestring
// });

// // Set the id of the Feature
// feature.setId('my-feature');

// const vectorLayer = new VectorLayer({
//   source: new VectorSource({
//     features: [feature]
//   })
// });
// this.map.addLayer(vectorLayer);
