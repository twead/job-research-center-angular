import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface Data {
  title: string;
  paragraph: string;
  instructions: string;
}

@Component({
  selector: 'app-mat-modal',
  templateUrl: './mat-modal.component.html',
  styleUrls: ['./mat-modal.component.css']
})
export class MatModalComponent {

  constructor(public dialogRef: MatDialogRef<MatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

}
