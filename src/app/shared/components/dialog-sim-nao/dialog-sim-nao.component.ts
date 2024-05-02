import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-sim-nao',
  templateUrl: './dialog-sim-nao.component.html',
  styleUrls: ['./dialog-sim-nao.component.scss'],
})
export class DialogSimNaoComponent {
  constructor(public dialogRef: MatDialogRef<DialogSimNaoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { title: string, msg: string }) {}
  
}
