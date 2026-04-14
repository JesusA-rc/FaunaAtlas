export interface Animal {
    id: number;
    habitatId: number;
    nombreComun: string;
    nombreCientifico: string;
    clase: string;
    estadoConservacion: string;
    dieta: string;
    descripcion: string;
    imagenUrl?: string;
    habitat?: Habitat;
    avistamientos?: Avistamiento[];
}

export interface Habitat {
    id: number;
    nombre: string;
    tipo: string;
    clima: string;
    region: string;
    descripcion: string;
    imagenUrl?: string;
    animales?: Animal[];
}

export interface Noticia {
    id: number;
    animalId?: number;
    habitatId?: number;
    titulo: string;
    contenido: string;
    imagenUrl?: string;
    tagCategoria: string;
    tagRegion: string;
    fechaPublicacion: string;
    autor: string;
    animal?: Animal;
    habitat?: Habitat;
}

export interface Avistamiento {
    id: number;
    animalId: number;
    ubicacion: string;
    fecha: string;
    reportadoPor: string;
    notas: string;
    latitud: number;
    longitud: number;
    animal?: Animal;
}
