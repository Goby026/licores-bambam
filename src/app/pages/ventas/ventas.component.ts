import { Component, OnInit } from '@angular/core';

// import moment from 'moment';
import * as moment from 'moment';
import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/Producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoToVentaService } from 'src/app/services/producto-to-venta.service';
import { VentasService } from 'src/app/services/ventas.service';

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
    user_id: 1
  }

  // banderas
  ultimasVentas: boolean = false;

  constructor(private productosService: ProductosService, private productoToVenta: ProductoToVentaService) { }

  ngOnInit(): void {
    this.venta.fecha_venta = moment().format('YYYY-MM-DD');
    // this.venta.user_id = localStorage.getItem('usuario');
    // console.log(this.venta);
  }

  agregarProducto(item: any) {

    this.calculos(item);

    this.addProductos.push(item);

  }

  calculos(producto: any) {

    this.venta.subtotal += producto.precioVenta - (producto.precioVenta * 0.18);

    this.venta.igv += producto.precioVenta * 0.18;

    this.venta.total += producto.subtotal;

  }

  // metodo par refrescar los calculos despues de quitar un item
  leerProductos() {

    this.venta.subtotal = 0.00;
    this.venta.igv = 0.00;
    this.venta.total = 0.00;

    this.addProductos.forEach((e) => {
      this.calculos(e);
    });

  }

  // registrar venta
  registrar() {
    if (this.addProductos.length == 0) {
      alert('ingresar producto para venta');
      return;
    }

    Swal.fire({
      title: '¿Registrar venta?',
      text: "Se registrará la venta con los productos indicados",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoToVenta.create(this.addProductos, this.venta)
          .subscribe((resp: any) => {
            this.nuevaVenta();
          }, err => console.log(err));
        Swal.fire(
          'Registrado!',
          'Tu venta se registró correctamente.',
          'success'
        );
      }
    });

  }

  nuevaVenta() {
    this.texto = '';
    this.productos = [];
    this.addProductos = [];
    this.venta.subtotal = 0.00;
    this.venta.igv = 0.00;
    this.venta.total = 0.00;
    this.venta.dcto = 0.00;
    this.venta.incremento = 0.00;
  }

  quitarProducto(item: any) {
    let i = this.addProductos.indexOf(item);

    if (i !== -1) {
      this.addProductos.splice(i, 1);
    }

    this.leerProductos();
  }

}
