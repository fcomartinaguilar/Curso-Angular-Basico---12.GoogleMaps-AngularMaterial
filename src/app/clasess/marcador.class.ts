export class Marcador {
    constructor ( public lat:number, public lng:number) {}
    public titulo:string = 'Sin titulo';
    public desc:string = 'Sin descripcion';
}

// Es lo mismo que lo de arriba
export class Marcador2 {
    public lat:number;
    public lng:number;

    constructor ( lat: number, lng:number ) {
        this.lat = lat;
        this.lng = lng;
    }
}