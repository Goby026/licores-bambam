import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoToMovimientoService {

  private url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create(addProductos: any, movimiento: any){
    return this.http.post(`${ this.url }/prod-movimiento/new`, {addProductos, movimiento})
  }

  read( opc?: number ){

    return this.http.get(`${this.url}/prod-movimiento/${opc}`);

  }

  update(){}

  delete(){}
}
