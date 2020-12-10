import { Component, OnInit } from '@angular/core';
import { ProductoToMovimientoService } from 'src/app/services/producto-to-movimiento.service';


@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
})
export class ListaMovimientosComponent implements OnInit {

  public movimientos: any[] = [];

  constructor( private prodToMovService: ProductoToMovimientoService ) { }

  ngOnInit(): void {
    this.listarMovimientos();
  }

  listarMovimientos(){
    this.prodToMovService.read(0)
    .subscribe( (resp: any)=>{
      console.log(resp);
      this.movimientos = resp.movimientos;
    });
  }

}
