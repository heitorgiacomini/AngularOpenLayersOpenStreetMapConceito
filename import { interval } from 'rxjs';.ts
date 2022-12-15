import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { GeoJSON as GeoJSONFormat } from 'ol/format';


getUserLines(): Observable<Line[]> {
  return this.http.get<Line[]>(`${this.geoApiUrl}?address=user+location`);
}

getUserLines(): Observable<Line[]> {
  return interval(30000).pipe(
    mergeMap(() => this.http.get<Line[]>(`${this.geoApiUrl}?address=user+location`))
  );
}

getUserLines(): Observable<Line[]> {
  return interval(30000).pipe(
    mergeMap(() => this.http.get<Line[]>(`${this.geoApiUrl}?address=user+location`)),
    map(response => {
      const geoJSONFormat = new GeoJSONFormat();
      return geoJSONFormat.readFeatures(response);
    })
  );
}
