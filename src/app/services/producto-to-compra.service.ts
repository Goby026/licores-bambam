import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class ProductoToCompraService {
  url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create(prodToCompra: any[], compra: any){
    return this.http.post(`${this.url}/prod-compra/new`, {
      prodToCompra,
      compra
    });
  }

  read(){
    return this.http.get(`${this.url}/prod-compra`);
  }

  update(){

  }

  delete(){

  }
}
