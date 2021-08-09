import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../../models/Articulo.model';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulosForm: FormGroup;
  articulos: Articulo[] = [];
  formulario: boolean = false;
  modificar: boolean = false;

  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  constructor(private artService: ArticulosService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarArticulos();
  }

  crearFormulario() {
    this.articulosForm = this.fb.group({
      nombre: [, Validators.required],
      descripcion: [, Validators.required],
      estado: [],
      id: []
    });
  }

  listarArticulos() {
    this.artService.read()
      .subscribe((resp: any) => {
        this.articulos = resp;
      });
  }

  registrar() {

    if(this.articulosForm.invalid){
      alert('Debe ingresar correctamente los campos del formulario');
      return;
    }

    let articulo: Articulo = {
      nombre: this.articulosForm.value.nombre,
      descripcion: this.articulosForm.value.descripcion
    }

    this.artService.create(articulo)
    .subscribe( (resp)=>{
      console.log(resp);
      this.listarArticulos();
      this.resetear();
    } );


  }

  editar(articulo: Articulo){

    this.articulosForm.setValue({
      nombre: articulo.nombre,
      descripcion: articulo.descripcion,
      estado: articulo.estado,
      id: articulo.id
    });

  }

  actualizar(){

    let articulo: Articulo = {
      nombre: this.articulosForm.value.nombre,
      descripcion: this.articulosForm.value.descripcion,
      estado: this.articulosForm.value.estado,
      id: this.articulosForm.value.id
    }

    this.artService.update(articulo)
    .subscribe( (resp)=>{
      this.listarArticulos();
      this.resetear();
    });

  }

  eliminar(id: number){

    const borrar = confirm('Desea eliminar el artículo');
    if(!borrar){
      return;
    }
    this.artService.delete(id)
    .subscribe( ()=> this.listarArticulos() );
  }

  resetear() {
    this.articulosForm.reset();
  }

}
