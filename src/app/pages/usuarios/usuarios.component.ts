import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service'
import { Usuario } from '../../models/Usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  userForm: FormGroup;
  usuarios: Usuario[] = [];
  formRegistro: boolean = false;
  edit: boolean = false;

  usuario: Usuario;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
  }


  crearFormulario() {
    this.userForm = this.fb.group({
      nombres: [, Validators.required],
      apellidos: [, Validators.required],
      dni: [, Validators.required],
      username: [, Validators.required],
      password: [, Validators.required],
      role: ['USER_ROLE', Validators.required],
      id: []
    });
  }

  listarUsuarios() {
    this.usuarioService.getAllUsers()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        // console.log('USUARIOS', this.usuarios);
      });
  }


  registrar() {
    // console.log(this.userForm.value.nombres);
    if (this.userForm.invalid) {
      alert('Ingrese correctamente los datos');
      return;
    }

    let user: Usuario = {
      nombres: this.userForm.value.nombres,
      apellidos: this.userForm.value.apellidos,
      dni: this.userForm.value.dni,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      role: this.userForm.value.role,

    };

    this.usuarioService.saveUser(user)
      .subscribe((resp) => {
        this.listarUsuarios();
        this.reiniciarFormulario();
      });
  }

  // metodo para setear los datos del usuario seleccionado
  editar(user: Usuario) {

    this.userForm.setValue({
      nombres: user.nombres,
      apellidos: user.apellidos,
      dni: user.dni,
      username: user.username,
      password: user.password,
      role: user.role,
      id: user.id
    });
  }

  actualizar() {

    let user: Usuario = {
      nombres: this.userForm.value.nombres,
      apellidos: this.userForm.value.apellidos,
      dni: this.userForm.value.dni,
      username: this.userForm.value.username,
      // password: this.userForm.value.password,
      role: this.userForm.value.role,
      id: this.userForm.value.id
    };

    this.usuarioService.updateUser(user)
    .subscribe( (resp) => {
      this.listarUsuarios();
    });

  }

  reiniciarFormulario() {
    this.userForm.reset();
  }

}
