import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  nuevoIngreso: boolean = false;
  nuevaSalida: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
