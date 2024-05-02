import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ok',
  templateUrl: './dialog-ok.component.html',
  styleUrls: ['./dialog-ok.component.scss']
})
export class DialogOkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
