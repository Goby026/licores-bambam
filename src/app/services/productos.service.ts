import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Producto } from '../models/Producto.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = GlobalConstants.apiUrl;

  constructor(private http: HttpClient) { }

  create(producto: Producto) {

    return this.http.post(`${this.url}/productos/newProducto`, producto);

  }

  read() {
    // return this.http.get(`${this.url}/productos`);
    return this.http.get(`${this.url}/productos`)
    .pipe(
      map( (resp:any) => {
        if(resp){
          return resp.productos.filter( (item)=>{
            return item;
          });
        }else{
          return [];
        }
      })
    );
  }

  update(producto: Producto) {
    return this.http.put(`${this.url}/productos/${producto.id}`, producto);
  }

  getOne(id: number) {
    return this.http.get(`${this.url}/productos/${id}`);
  }

  find(texto: string) {
    // return this.http.get(`${this.url}/productos/buscarProducto/${texto}`);

    return this.http.get(`${this.url}/productos/buscarProducto/${texto}`)
    .pipe(
      map( (resp:any) => {
        if(resp){
          return resp.productos.filter( (item)=>{
            item.unidades = item.cantidad;
            item.cantidad = 1;
            return item;
          });
        }else{
          return [];
        }
      })
    );
  }
}
