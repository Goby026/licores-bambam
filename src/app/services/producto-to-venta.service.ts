import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoToVentaService {

  url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create(prodToVenta: any[], venta: any){
    return this.http.post(`${this.url}/prod-venta/new`, {
      prodToVenta,
      venta
    });
  }

  read(){
    return this.http.get(`${this.url}/prod-venta`);
  }

  update(){

  }

  delete(){

  }


}
