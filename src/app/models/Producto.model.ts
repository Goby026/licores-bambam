import { Articulo } from './Articulo.model';
import { Categoria } from './Categoria.model';

export interface Producto {

    nombre: string,
    unidad: string,
    precioVenta: number,
    precioCompra: number,
    cantidad: number,
    imagen: string,
    stockMinimo: number,
    stockMaximo: number,
    stockReal: number,
    articulos?: Articulo[],
    categoria?: number,
    id?: number

}