import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoToCompraService } from 'src/app/services/producto-to-compra.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  texto: string = '';
  productos: Producto[] = [];
  addProductos: any[] = [];
  compra: any = {
    fecha_compra: null,
    proveedor: '',
    ruc: '',
    documento: '',
    serie: '',
    nro: '',
    total : 0.00,
    user_id: 1
  }

  constructor( private productosService: ProductosService, private prodToCompra: ProductoToCompraService ) { }

  ngOnInit(): void {
    this.compra.fecha_compra = moment().format('YYYY-MM-DD');
  }

  listarProductos(  ) {
    this.productosService.find(this.texto)
      .subscribe((resp: any) => {

        this.productos = resp.productos.map( (item)=>{
          item.unidades = item.cantidad;
          item.cantidad = 1;
          return item;
        });

      });
  }

  agregarProducto(item: any) {

    let producto: any = {
      nombre: item.nombre,
      unidad: item.unidad,
      precioVenta: item.precioVenta,
      precioCompra: item.precioCompra,
      cantidad: item.cantidad,
      unidades: item.unidades * item.cantidad,
      stockMinimo: item.stockMinimo,
      stockMaximo: item.stockMaximo,
      stockReal: item.stockReal,
      subtotal: item.cantidad * item.precioCompra,
      dcto: 0.00,
      id: item.id
    }

    this.calculos(producto);

    this.addProductos.push(producto);

  }

  calculos(producto: any) {
    this.compra.total += producto.subtotal;
  }

  operar(item){
    // console.log(item.subtotal / item.cantidad);
    item.precioCompra = item.subtotal / item.cantidad;
  }

  descuento(item){
    item.subtotal -= item.dcto;
    this.operar(item);
  }

  leerProductos() {
    
    this.compra.total = 0.00;

    this.addProductos.forEach((e) => {
      this.calculos(e);
    });

  }

  registrar(){

    if (this.addProductos.length <= 0) {
      alert('No hay productos agregados');
      return;
    }

    if (this.compra.documento == '') {
      alert('Debe indicar el tipo de documento');
      return;
    }

    Swal.fire({
      title: '¿Registrar compra?',
      text: "Se registrará la compra con los productos indicados",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.prodToCompra.create(this.addProductos, this.compra)
          .subscribe( (resp: any)=>{
            this.nuevaCompra();
          }, err => console.log('[ERROR]->', err) );

        Swal.fire(
          'Registrado!',
          'Tu compra se registró correctamente.',
          'success'
        );
      }
    });
  }

  nuevaCompra() {
    this.texto = '';
    this.productos = [];
    this.addProductos = [];
    this.compra.proveedor = '';
    this.compra.ruc = '';
    this.compra.documento = '';
    this.compra.serie = '';
    this.compra.nro = '';
    this.compra.subtotal = 0.00;
    this.compra.igv = 0.00;
    this.compra.total = 0.00;
    this.compra.dcto = 0.00;
    this.compra.incremento = 0.00;
  }

  quitarProducto(item: any) {
    let i = this.addProductos.indexOf(item);

    if (i !== -1) {
      this.addProductos.splice(i, 1);
    }

    this.leerProductos();
  }

}