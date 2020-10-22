import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Categoria } from '../models/Categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create( categoria: Categoria ){
    return this.http.post(`${this.url}/categorias/newCategoria`, categoria);
  }

  read(){
    return this.http.get(`${this.url}/categorias`);
  }


  update( categoria: Categoria ){
    return this.http.put(`${this.url}/categorias/${categoria.id}`, categoria);
  }


  delete(id: number){

    return this.http.delete( `${this.url}/categorias/${id}`);

  }
}
