import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/Usuario.model';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = GlobalConstants.apiUrl;

  usuario: Usuario;

  constructor( private http: HttpClient ) { }


  saveUser( user: Usuario ){

    return this.http.post(`${this.url}/users/newUser`, user);

  }

  getAllUsers(){
    return this.http.get(`${this.url}/users`);
  }

  updateUser(user: Usuario){
    return this.http.patch(`${this.url}/users/${user.id}`, user);
  }


}
