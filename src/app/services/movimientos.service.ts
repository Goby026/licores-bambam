import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create(){}

  read(){
    return this.http.get(`${this.url}/prod-movimiento`);
  }

  update(){}

  delete(){}
}
