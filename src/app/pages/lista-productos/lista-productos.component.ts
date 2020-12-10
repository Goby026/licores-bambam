import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria.model';
import { Producto } from 'src/app/models/Producto.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';
import { PdfMakeWrapper, Txt, Table, Cell } from 'pdfmake-wrapper';

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

  constructor(private productosService: ProductosService, private categoriaService: CategoriasService) { }

  ngOnInit(): void {
    this.listarCategorias();
    // this.listarProductos();
  }

  listarProductos(val) {
    if (val) {
      this.productosService.read()
        .subscribe((resp: any) => {
          this.productos = resp;
        });
    } else {
      this.productos = [];
    }
  }

  listarCategorias() {
    this.categoriaService
      .read().subscribe((resp: any) => {
        this.categorias = resp.categorias;
      });
  }

  filtrarCategoria(id: number) {
    this.productosService.findByCategory(id)
      .subscribe((resp: any) => {
        this.productos = resp;
      }, err => console.error('[ERROR]->', err));
  }

  filtrarProducto(prod: string) {

    if (prod.trim().length <= 0) {
      this.productos = [];
      return;
    }

    this.productosService.findAll(prod)
      .subscribe((resp: any) => {
        this.productos = resp;
      }, err => console.error('[ERROR]->', err));
  }

  crearPdf() {
    const pdf = new PdfMakeWrapper();

    // pdf.add(
    //   new Txt('Hola mundo').bold().italics().end
    // );

    pdf.add(
      new Table([
        [ 'column 1', 'column 2'],
        [ 'column 1', 'column 2']
      ]).end
    );

    pdf.create().open();

  }

}
