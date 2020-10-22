import { Component, OnInit } from '@angular/core';

import moment from 'moment';

import { Producto } from 'src/app/models/Producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoToVentaService } from 'src/app/services/producto-to-venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  texto: string = '';
  productos: Producto[] = [];
  addProductos: any[] = [];
  venta: any = {
    fecha_venta: null,
    subtotal: 0.00,
    igv: 0.00,
    total: 0.00,
    dcto: 0.00,
    incremento: 0.00,
    user_id: null
  }  

  constructor( private productosService: ProductosService, private productoToVenta: ProductoToVentaService ) { }

  ngOnInit(): void {
    this.venta.fecha_venta = moment().format('YYYY-MM-DD');
    this.venta.user_id = localStorage.getItem('usuario');
    console.log(this.venta);
  }

  listarProductos(){
    this.productosService.find(this.texto)
    .subscribe( (resp: any)=>{

      this.productos = resp.productos;

    });
  }

  agregarProducto(item: Producto){

    let producto: any = {
      nombre: item.nombre,
      unidad: item.unidad,
      precioVenta: item.precioVenta,
      precioCompra: item.precioCompra,
      cantidad: item.cantidad,      
      stockMinimo: item.stockMinimo,
      stockMaximo: item.stockMaximo,
      stockReal: item.stockReal,
      subtotal : item.cantidad * item.precioVenta,
      id: item.id
    }
    
    this.calculos(producto);

    this.addProductos.push(producto);

  }

  calculos(producto: any){

    this.venta.subtotal += producto.precioVenta - (producto.precioVenta * 0.18);

    this.venta.igv +=  producto.precioVenta * 0.18;

    this.venta.total += producto.subtotal;

  }

  // metodo par refrescar los calculos despues de quitar un item
  leerProductos(){

    this.venta.subtotal = 0.00;
    this.venta.igv = 0.00;
    this.venta.total = 0.00;

    this.addProductos.forEach( (e)=>{
      this.calculos(e);
    } );

  }

  // registrar venta
  registrar(){
    if(this.addProductos.length == 0){
      alert('ingresar producto para venta');
      return;
    }

    // console.log(this.addProductos);
    // console.log(this.venta);

    this.productoToVenta.create(this.addProductos, this.venta)
    .subscribe( (resp:any)=>{
      console.log(resp);
    }, err => console.log(err) );
  }

  nuevaVenta(){
    this.texto = '';
    this.productos = [];
    this.addProductos = [];
    this.venta.subtotal = 0.00;
    this.venta.igv = 0.00;
    this.venta.total = 0.00;
    this.venta.dcto = 0.00;
    this.venta.incremento = 0.00;
  }

  quitarProducto ( item: any ) {
    let i = this.addProductos.indexOf( item );
 
    if ( i !== -1 ) {
        this.addProductos.splice( i, 1 );
    }

    this.leerProductos();
  }


}
