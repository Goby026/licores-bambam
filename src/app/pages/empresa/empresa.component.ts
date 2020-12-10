import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  empresaForm: FormGroup;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.empresaForm = this.fb.group({

    });
  }

}
