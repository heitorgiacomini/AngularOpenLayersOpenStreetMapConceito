import { Component } from '@angular/core';
import { MultiLineString, Point } from 'ol/geom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myPointValue: Point = new Point(
    [
      10,
      20
    ]
  );

  mylines: MultiLineString = new MultiLineString (
    [
      [
        [0, 0],
        [10, 10],
        [20, 20]
      ],
      [
        [30, 30],
        [40, 40],
        [50, 50]
      ]
    ]
  );
}
