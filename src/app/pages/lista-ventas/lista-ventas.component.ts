import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';

import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  ventas: any[] = [];
  fecha: string = '';

  constructor( private ventaService: VentasService ) { }

  ngOnInit(): void {
    this.fecha = moment().format('YYYY-MM-DD');
  }

  cargarVentas(){

    this.ventaService.findByDate(this.fecha)
    .subscribe( (resp: any)=>{
      this.ventas = resp.ventas.map( (item)=>{
        console.log(item.productoToVentas);
        return {
          fecha: item.fecha_venta,
          cantidad: 1,
          productos: item.productoToVentas
        }
      });
    }, err => console.log('[ERROR]->',err));
  }

}