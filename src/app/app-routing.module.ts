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
import { KardexComponent } from './pages/kardex/kardex.component';
import { ListaMovimientosComponent } from './pages/lista-movimientos/lista-movimientos.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "menu", component: MenuComponent, data: { titulo: 'Menú' } },
      { path: "altaProductos", component: AltaProductosComponent, data: { titulo: 'Alta de productos' } },
      { path: "altaProductos/:id", component: AltaProductosComponent, data: { titulo: 'Editar producto' } },
      { path: "articulos", component: ArticulosComponent, data: { titulo: 'Artículos' } },
      { path: "categorias", component: CategoriasComponent, data: { titulo: 'Categorias' } },
      { path: "compras", component: ComprasComponent, data: { titulo: 'Compras' } },
      { path: "lista-compras", component: ListaComprasComponent, data: { titulo: 'Lista de compras' } },
      { path: "lista-productos", component: ListaProductosComponent, data: { titulo: 'Lista de productos' } },
      { path: "lista-ventas", component: ListaVentasComponent, data: { titulo: 'Lista de ventas' } },
      { path: "movimientos", component: MovimientosComponent, data: { titulo: 'Movimientos' } },
      { path: "usuarios", component: UsuariosComponent, data: { titulo: 'Usuarios' } },
      { path: "ventas", component: VentasComponent, data: { titulo: 'Ventas' } },
      { path: "kardex", component: KardexComponent, data: { titulo: 'Kardex' } },
      { path: "lista-movimientos", component: ListaMovimientosComponent, data: { titulo: 'Lista de movimientos' } },
      { path: "empresa", component: EmpresaComponent, data: { titulo: 'Empresa' } },
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
