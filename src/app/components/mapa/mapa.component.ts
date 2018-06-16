import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../clasess/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: []
})
export class MapaComponent implements OnInit {

  marcadores:Marcador[] = [];

  lat: number = 40.506900;
  lng: number = -3.665353;

  constructor( public snackBar: MatSnackBar,
              public dialog: MatDialog ) {

    /* Con el localStorage no hace falta esta inicializacion */
    /* const nuevoMarcador = new Marcador(40.506900, -3.665353);

    this.marcadores.push( nuevoMarcador ); */
    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse( localStorage.getItem( 'marcadores' ) );
    }
  }

  ngOnInit() {
  }

  agregarMarcador( evento ) {

    const coords: { lat:number, lng:number } = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push( nuevoMarcador );
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem( 'marcadores', JSON.stringify( this.marcadores ) );
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 } );
  }

  borrarMarcador( id:number ) {
    this.marcadores.splice( id, 1 );
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 } );
  }

  editarMarcador ( marcador:Marcador ) {
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( !result ) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 } );
    });
  }
}
