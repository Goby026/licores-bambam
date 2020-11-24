import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria.model';
import { Producto } from 'src/app/models/Producto.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria[] = [];

  // Pagination parameters.
  p: number = 1;
  count: number = 8;

  constructor( private productosService: ProductosService, private categoriaService: CategoriasService ) { }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarProductos();
  }

  listarProductos(){
    this.productosService.read()
    .subscribe( (resp: any)=>{
      this.productos = resp;
    });
  }

  listarCategorias(){
    this.categoriaService
    .read().subscribe( (resp:any)=>{
      this.categorias = resp.categorias;
    });
  }

}
