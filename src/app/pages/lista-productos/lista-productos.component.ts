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

  constructor( private productosService: ProductosService, private categoriaService: CategoriasService ) { }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarProductos();
  }

  listarProductos(){
    this.productosService.read()
    .subscribe( (resp: any)=>{
      console.log(resp);
      this.productos = resp.productos;
    });
  }

  listarCategorias(){
    this.categoriaService
    .read().subscribe( (resp:any)=>{
      this.categorias = resp.categorias;
    });
  }

}
