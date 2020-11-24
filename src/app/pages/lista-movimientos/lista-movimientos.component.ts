import { Component, OnInit } from '@angular/core';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
})
export class ListaMovimientosComponent implements OnInit {

  public movimientos: any[] = [];

  constructor( private movimientosService: MovimientosService ) { }

  ngOnInit(): void {
    this.listarMovimientos();
  }

  listarMovimientos(){
    this.movimientosService.read()
    .subscribe( (resp: any)=>{
      console.log(resp);
      this.movimientos = resp.movimientos;
    });
  }

}
