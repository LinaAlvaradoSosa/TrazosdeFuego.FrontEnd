// core/Interfaces/riducto.interface.ts (ejemplo)
export interface Producto {
    _id: string;
    nombre: string;
    imagen: string;      // "productos/archivo.jpg"
    tipo: string;
    imagenUrl?: string;  // backend la puede mandar ya armada
}

export interface ProductosPaginados {
    ok: boolean;
    data: Producto[];
    tipo?: string;
    total: number;
    pagina: number;
    totalPaginas: number;
}