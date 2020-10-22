import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/Articulo.model';
import { Categoria } from 'src/app/models/Categoria.model';
import { Producto } from 'src/app/models/Producto.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.css']
})
export class AltaProductosComponent implements OnInit {

  productoForm: FormGroup;
  addArticulo: boolean = true;
  editar: boolean = false;
  articulos: Articulo[] = [];
  categorias: Categoria[] = [];
  artAdd: Articulo[] = [];  

  constructor(
    private productoService: ProductosService, 
    private artService: ArticulosService, 
    private categoriaService: CategoriasService, 
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarArticulos();
    this.listarCategorias();
    this.validarEditar(this.rutaActiva.snapshot.params);
  }

  crearFormulario() {
    this.productoForm = this.fb.group({
      nombre: [, Validators.required],
      unidad: [, Validators.required],
      precioVenta: [, Validators.required],
      precioCompra: [, Validators.required],
      cantidad: [, Validators.required],
      imagen: [],
      stockMinimo: [, Validators.required],
      stockMaximo: [, Validators.required],
      stockReal: [, Validators.required],
      categoria: [, Validators.required],
      id: []
    });
  }

  // validar y cargar cita
  validarEditar(param){
    if(param.id > 0){
      this.editar = true;
      this.productoService.getOne(param.id)
      .subscribe( (resp: any) => {
        
        this.productoForm.setValue({
          nombre: resp.nombre,
          unidad: resp.unidad,
          precioVenta: resp.precioVenta,
          precioCompra: resp.precioCompra,
          cantidad: resp.cantidad,
          imagen: resp.imagen,
          stockMinimo: resp.stockMinimo,
          stockMaximo: resp.stockMaximo,
          stockReal: resp.stockReal,
          categoria: resp.categoria.id,
          id: resp.id
        });

        this.artAdd = resp.articulos;

        console.log('ID DE CATEGORIA', resp.categoria.id);
        console.log('articulos', resp.articulos);
        this.editar = true;
      });
    }
  }

  listarArticulos() {
    this.artService.read()
      .subscribe((resp: any) => {
        this.articulos = resp.articulos;
      });
  }

  listarCategorias(){
    this.categoriaService.read()
    .subscribe( (resp: any)=>{
      this.categorias = resp.categorias;
    });
  }

  agregarArticulo(articulo: Articulo) {
    this.artAdd.push(articulo);

    this.productoForm.setValue({
      nombre: articulo.nombre,
      unidad: 'UNIDAD',
      precioVenta: 0.00,
      precioCompra: 0.00,
      cantidad: 1,
      imagen: '',
      stockMinimo: 1,
      stockMaximo: 100,
      stockReal: 0,
      categoria: 1,
      id: ''
    });
  }

  registrar() {

    if(this.productoForm.invalid){
      alert('Ingrese correctamente los campos del producto');
      return;
    }

    if(this.artAdd.length <= 0){
      alert('Debe indicar el artículo del producto');
      return;
    }

    let producto: Producto = {
      nombre: this.productoForm.value.nombre,
      unidad: this.productoForm.value.unidad,
      precioVenta: this.productoForm.value.precioVenta,
      precioCompra: this.productoForm.value.precioCompra,
      cantidad: this.productoForm.value.cantidad,
      imagen: this.productoForm.value.imagen,
      stockMinimo: this.productoForm.value.stockMinimo,
      stockMaximo: this.productoForm.value.stockMaximo,
      stockReal: this.productoForm.value.stockReal,
      articulos : this.artAdd,
      categoria: this.productoForm.value.categoria
    }

    this.productoService.create(producto)
    .subscribe((resp) => {
      console.log(resp);
    }, err => {
      alert(err.error.message);
    });
  }

  actualizar(){

    if(this.productoForm.invalid){
      alert('Ingrese correctamente los campos del producto');
      return;
    }

    if(this.artAdd.length <= 0){
      alert('Debe indicar el artículo del producto');
      return;
    }

    let producto: Producto = {
      nombre: this.productoForm.value.nombre,
      unidad: this.productoForm.value.unidad,
      precioVenta: this.productoForm.value.precioVenta,
      precioCompra: this.productoForm.value.precioCompra,
      cantidad: this.productoForm.value.cantidad,
      imagen: this.productoForm.value.imagen,
      stockMinimo: this.productoForm.value.stockMinimo,
      stockMaximo: this.productoForm.value.stockMaximo,
      stockReal: this.productoForm.value.stockReal,
      articulos : this.artAdd,
      categoria: this.productoForm.value.categoria,
      id: this.productoForm.value.id
    }

    this.productoService.update(producto)
    .subscribe( (resp:any)=>{

      console.log(resp);

    } );
  }
  
  quitarArticulo(item: any){
    let i = this.artAdd.indexOf(item);
    if ( i !== -1 ) {
      this.artAdd.splice( i, 1 );
    }

    if(this.artAdd.length <= 0){
      this.productoForm.reset();
    }
  }


}
