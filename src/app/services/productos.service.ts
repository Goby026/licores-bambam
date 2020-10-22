import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Producto } from '../models/Producto.model';

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
    return this.http.get(`${this.url}/productos`);
  }

  update(producto: Producto) {
    return this.http.put(`${this.url}/productos/${producto.id}`, producto);
  }

  getOne(id: number) {
    return this.http.get(`${this.url}/productos/${id}`);
  }

  find(texto: string) {
    return this.http.get(`${this.url}/productos/buscarProducto/${texto}`);
  }
}
