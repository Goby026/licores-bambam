import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create(){}

  read(){}

  update(){}

  delete(){}

  findByDate(fecha: any){

    return this.http.get(`${this.url}/ventas/buscarVentasFecha/${fecha}`);

  }
}
