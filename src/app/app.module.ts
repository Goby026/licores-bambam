import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';

// modulo de rutas
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { AltaProductosComponent } from './pages/alta-productos/alta-productos.component';
import { ListaComprasComponent } from './pages/lista-compras/lista-compras.component';
import { ListaVentasComponent } from './pages/lista-ventas/lista-ventas.component';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { KardexComponent } from './pages/kardex/kardex.component';
import { MovFormComponent } from './pages/movimientos/mov-form.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { ListaMovimientosComponent } from './pages/lista-movimientos/lista-movimientos.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { OrdenCompraComponent } from './pages/orden-compra/orden-compra.component';
import { BuscadorProductosComponent } from './shared/buscador-productos/buscador-productos.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PagesComponent,
    ErrorPageComponent,
    MenuComponent,
    VentasComponent,
    ComprasComponent,
    ArticulosComponent,
    AltaProductosComponent,
    ListaComprasComponent,
    ListaVentasComponent,
    ListaProductosComponent,
    CategoriasComponent,
    MovimientosComponent,
    UsuariosComponent,
    KardexComponent,
    MovFormComponent,
    BreadcrumbsComponent,
    ListaMovimientosComponent,
    EmpresaComponent,
    OrdenCompraComponent,
    BuscadorProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
