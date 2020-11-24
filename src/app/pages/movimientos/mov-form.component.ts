import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoToMovimientoService } from 'src/app/services/producto-to-movimiento.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mov-form',
  templateUrl: './mov-form.component.html',
  styles: [
  ]
})
export class MovFormComponent implements OnInit {

  @ViewChild('auto') auto;

  keyword = 'nombre';
  noPro = 'no se encuentra';
  placeholder = 'Producto';

  productos: any;
  movimiento: any = {};
  addProductos: any[] = [];
  form : boolean = false;
  observaciones: string = '';
  total: number = 0.00;

  @Input() tipoMovimiento: number;

  constructor( private prodService: ProductosService, private prodToMov: ProductoToMovimientoService ) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this.productos = this.prodService.read()
    .subscribe( (resp: any)=>{
      console.log(resp);
      this.productos = resp.productos;
    }, err=> console.error('[ERROR]', err) );
  }

  listarUltimosMovimientos(){
  }

  registrar(){

    if(this.addProductos.length <= 0){
      alert('Ingrese productos');
      return;
    }

    this.movimiento.fecha = moment().format('YYYY-MM-DD');
    this.movimiento.observaciones = this.observaciones;
    this.movimiento.tipoMovimiento = this.tipoMovimiento;
    this.movimiento.userId = 1;

    this.prodToMov.create(this.addProductos, this.movimiento)
    .subscribe( (resp)=>{
      console.log(resp);
    }, err => console.error('[ERROR]', err) );

  }

  calcularSubtotal(item){
    item.subtotal = parseFloat(item.num) * parseFloat(item.importe);
    this.total = this.calcularTotal();
  }

  calcularTotal(): number{
    let t: number = 0.00;
    this.addProductos.forEach( (item)=>{
      t += parseFloat(item.subtotal);
    });
    return t;
  }

  quitarProducto(item){
    let i = this.addProductos.indexOf(item);

    if (i !== -1) {
      this.addProductos.splice(i, 1);
    }

    // this.leerProductos();
  }

  selectEvent(item): void {
    console.log("..................");
    let p: any = {
      productoId: item.id,
      nombre: item.nombre,
      num: 1,
      importe: 0.00,
      subtotal: 0.00
    }
    console.log(p);
    this.addProductos.push(p);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

  clearPanel(e): void {
    // e.stopPropagation();
    this.auto.clear();
  }

}
