import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Articulo } from '../models/Articulo.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create( articulo: Articulo ){
    return this.http.post(`${this.url}/articulos/newArticulo`, articulo);
  }

  read(){
    return this.http.get(`${this.url}/articulos`);
  }

  search(texto: string){
    return this.http.get(`${this.url}/articulos/search/${texto}`).pipe(
      map( (item: any)=>{
        return item ? item: [];
      })
    );
  }

  update( articulo: Articulo ){
    return this.http.put(`${this.url}/articulos/${articulo.id}`, articulo);
  }

  delete( id: number ){
    return this.http.delete(`${this.url}/articulos/${id}`);
  }

}
