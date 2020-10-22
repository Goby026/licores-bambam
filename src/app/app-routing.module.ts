import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";

import { PagesComponent } from "./pages/pages.component";
import { MenuComponent } from "./pages/menu/menu.component";
import { AltaProductosComponent } from "./pages/alta-productos/alta-productos.component";
import { ArticulosComponent } from "./pages/articulos/articulos.component";
import { CategoriasComponent } from "./pages/categorias/categorias.component";
import { ComprasComponent } from "./pages/compras/compras.component";
import { ListaComprasComponent } from "./pages/lista-compras/lista-compras.component";
import { ListaProductosComponent } from "./pages/lista-productos/lista-productos.component";
import { ListaVentasComponent } from "./pages/lista-ventas/lista-ventas.component";
import { MovimientosComponent } from "./pages/movimientos/movimientos.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { VentasComponent } from "./pages/ventas/ventas.component";
import { ErrorPageComponent } from "./shared/error-page/error-page.component";
// import { FichaComponent } from './pages/mostrar-citas/ficha.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "menu", component: MenuComponent },
      { path: "altaProductos", component: AltaProductosComponent },
      { path: "altaProductos/:id", component: AltaProductosComponent },
      { path: "articulos", component: ArticulosComponent },
      { path: "categorias", component: CategoriasComponent },
      { path: "compras", component: ComprasComponent },
      { path: "lista-compras", component: ListaComprasComponent },
      { path: "lista-productos", component: ListaProductosComponent },
      { path: "lista-ventas", component: ListaVentasComponent },
      { path: "movimientos", component: MovimientosComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "ventas", component: VentasComponent },
      { path: '',   redirectTo: '/login', pathMatch: 'full' },
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
