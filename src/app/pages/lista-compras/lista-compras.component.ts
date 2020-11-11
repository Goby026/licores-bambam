import { Component, OnInit } from '@angular/core';
import { ProductoToCompraService } from 'src/app/services/producto-to-compra.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  prodToCompras: any[];
  total: number = 0.00;
  porProveedor: boolean = false;
  porProducto: boolean = false;
  porRango: boolean = false;
  porFecha: boolean = false;

  constructor( private prodToCompra: ProductoToCompraService ) { }

  ngOnInit(): void {
  }

  listarCompras(){
    this.prodToCompra.read()
    .subscribe( (resp: any)=>{
      this.prodToCompras = resp.prodToCompras;
      this.calcularTotal();
    }, err => console.log('[ERROR]->', err));
  }

  calcularTotal(){
    this.prodToCompras.forEach( (item:any)=>{
      return this.total += parseFloat(item.subtotal);
    });
  }

  tipoBusqueda(item: number){

    if(item == 0){
      this.porProveedor = false;
      this.porProducto = false;
      this.porRango = false;
      this.porFecha = false;
    }

    if(item == 1){
      this.porProveedor = true;
      this.porProducto = false;
      this.porRango = false;
      this.porFecha = false;
    }

    if(item == 2){
      this.porProveedor = false;
      this.porProducto = true;
      this.porRango = false;
      this.porFecha = false;
    }

    if(item == 3){
      this.porProveedor = false;
      this.porProducto = false;
      this.porRango = true;
      this.porFecha = false;
    }

    if(item == 4){
      this.porProveedor = false;
      this.porProducto = false;
      this.porRango = false;
      this.porFecha = true;
    }

  }

  buscar(fecha: Date){
    console.log(fecha);
  }
  buscarPorRango(fechaI: Date, fechaF: Date){
    console.log('[FECHA INICIAL]', fechaI);
    console.log('[FECHA FINAL]', fechaF);
  }

}
