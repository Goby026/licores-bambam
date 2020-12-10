import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

  fecha_orden = null;
  addProductos = [];

  constructor() { }

  ngOnInit(): void {
    this.fecha_orden = moment().format('YYYY-MM-DD');
  }

  recibirProducto(item){
    this.addProductos.push(item);
  }

  quitarProducto(item: any) {
    let i = this.addProductos.indexOf(item);

    if (i !== -1) {
      this.addProductos.splice(i, 1);
    }

    // this.leerProductos();
  }

}
