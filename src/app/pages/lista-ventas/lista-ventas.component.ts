import { Component, OnInit } from '@angular/core';
import { ProductoToVentaService } from 'src/app/services/producto-to-venta.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  ventas: any[] = [];

  constructor( private productoToVenta: ProductoToVentaService ) { }

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(){
    this.productoToVenta.read()
    .subscribe( (resp: any)=>{
      this.ventas = resp.prodToVentas;
    }, err => console.log(err));
  }

}
