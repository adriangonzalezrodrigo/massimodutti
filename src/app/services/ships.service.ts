import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShipsAPIResponse } from './models/ships-api-response.model';
import { ShipsParams } from './models/ships-params.model';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  private url = 'https://swapi.dev/api/starships/';
  private headerDict = {
    Authorization: 'none',
    'Access-Control-Allow-Origin': '*',
  };
  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) {}

  public getShips(shipsParams: ShipsParams): Observable<ShipsAPIResponse> {
    const params = new HttpParams().append('page', shipsParams.page.toString());
    return this.http.get<ShipsAPIResponse>(this.url, { params });
  }
}
