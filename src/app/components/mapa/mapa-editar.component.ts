import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styles: []
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor(
        public dialogRef: MatDialogRef<MapaEditarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public fb:FormBuilder) {

      this.forma = fb.group({
        'titulo': data.titulo,
        'desc': data.desc
      });

  }

  ngOnInit() {
  }

  guardarCambios() {
    this.dialogRef.close(this.forma.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
