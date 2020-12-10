import { Component, OnInit } from '@angular/core';
import { ProductoToMovimientoService } from 'src/app/services/producto-to-movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  nuevoIngreso: boolean = false;
  nuevaSalida: boolean = false;

  ultimosMovimientos: any[] = [];

  constructor( private service: ProductoToMovimientoService ) { }

  ngOnInit(): void {
    this.cargarUltimosMovimientos();
  }

  cargarUltimosMovimientos(){
    this.service.read(5)
    .subscribe( (resp: any) => {
      this.ultimosMovimientos = resp.movimientos;
    } );
  }

  actualizar(e){
    if(e){
      this.cargarUltimosMovimientos();
    }
  }

}
