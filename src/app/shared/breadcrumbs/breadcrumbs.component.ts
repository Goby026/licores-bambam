import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string = '';
  titulos$: Subscription;

  constructor( private router: Router ) {
    this.titulos$ = this.getDataRutas()
    .subscribe( (data)=>{
      this.titulo = data.titulo;
      document.title = `BamBam ${data.titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.titulos$.unsubscribe();
  }

  getDataRutas(){
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event:ActivationEnd) => event.snapshot.data )
    );    
  }

}
