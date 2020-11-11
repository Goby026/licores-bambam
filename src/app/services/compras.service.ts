import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url = GlobalConstants.apiUrl;

  constructor( private http: HttpClient ) { }

  create(){}

  read(){
    return this.http.get(`${this.url}/compras`);
  }

  update(){}

  delete(){}
}
