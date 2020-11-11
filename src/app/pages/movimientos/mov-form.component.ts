import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mov-form',
  templateUrl: './mov-form.component.html',
  styles: [
  ]
})
export class MovFormComponent implements OnInit {

  keyword = 'nombre';
  noPro = 'no se encuentra';

  productos: any;
  form : boolean = false;

  @Input() tipoMovimiento: number;

  constructor( private prodService: ProductosService ) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this.productos = this.prodService.read()
    .subscribe( (resp: any)=>{
      this.productos = resp.productos;
    }, err=> console.error('[ERROR]', err) );
  }

  selectEvent(item) {
    console.log(item);
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused    
  }

}
