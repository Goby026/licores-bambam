import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/Categoria.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  categoriaForm: FormGroup;
  editarCategoria: boolean = false;
  formulario : boolean = false;

  constructor( private categoriaService: CategoriasService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarCategorias();
  }

  crearFormulario(){
    this.categoriaForm = this.fb.group({
      nombre: [, Validators.required],
      descripcion:[, Validators.required],
      estado:[],
      id:[]
    });
  }

  listarCategorias(){
    this.categoriaService.read()
    .subscribe( (resp:any) => {
      this.categorias = resp.categorias;
    });
  }

  registrar(){
    if(this.categoriaForm.invalid){
      alert('Ingrese correctamente los datos de la categoria');
      return;
    }

    let categoria: Categoria = {
      nombre: this.categoriaForm.value.nombre,
      descripcion: this.categoriaForm.value.descripcion,
    };

    this.categoriaService.create(categoria)
    .subscribe( (resp) =>{
      this.listarCategorias();
    } );

    console.log('REGISTRAR', categoria);
  }

  editar( cat: Categoria ){

    this.categoriaForm.setValue({
      nombre: cat.nombre,
      descripcion:cat.descripcion,
      estado:cat.estado,
      id:cat.id
    });

    console.log(this.categoriaForm.value);

  }

  actualizar() {

    if (this.categoriaForm.invalid) {
      alert("Debe rellenar correctamente los campos");
      return;
    }

    let categoria: Categoria = {
      nombre: this.categoriaForm.value.nombre,
      descripcion: this.categoriaForm.value.descripcion,
      id: this.categoriaForm.value.id
    }

    this.categoriaService.update(categoria)
    .subscribe((resp)=>{
      console.log(resp);
      this.listarCategorias();
      this.resetear();
    });
  }

  resetear(){
    this.categoriaForm.reset();
  }

  eliminar(id: number){
    this.categoriaService.delete(id)
    .subscribe( (resp)=>{
      console.log(resp);
      this.listarCategorias();
      this.resetear();
    });
  }

}
