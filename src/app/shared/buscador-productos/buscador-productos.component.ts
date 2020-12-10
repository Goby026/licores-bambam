import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-buscador-productos',
  templateUrl: './buscador-productos.component.html',
  styleUrls: ['./buscador-productos.component.css']
})
export class BuscadorProductosComponent implements OnInit {

  productos = [];

  @Output() producto = new EventEmitter<any>();

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
  }

  listarProductos(producto: string) {

    if (producto.trim().length <= 0) {
      this.productos = [];
      return;
    }

    this.productosService.findAll(producto)
      .subscribe((resp) => {
        this.productos = resp.map( (item)=>{
          item.unidades = 1;
          return item;
        } );
      }, err => console.error('[ERROR]->', err));

  }

  enviarProducto(item: any) {
    console.log('[ITEM]->', item);
    let p: any = {
      nombre: item.nombre,
      unidad: item.unidad,
      precioVenta: item.precioVenta,
      precioCompra: item.precioCompra,
      cantidad: item.cantidad,
      unidades: item.unidades,
      stockMinimo: item.stockMinimo,
      stockMaximo: item.stockMaximo,
      stockReal: item.stockReal,
      subtotal: item.cantidad * item.precioVenta,
      id: item.id
    }

    console.log('[UNIDADES->]', p.unidades);

    this.producto.emit(p);
  }

}
