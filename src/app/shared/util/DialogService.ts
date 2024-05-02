import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSimNaoComponent } from '../components/dialog-sim-nao/dialog-sim-nao.component'; 
import { DialogOkComponent } from '../components/dialog-ok/dialog-ok.component'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialogSimNao(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogSimNaoComponent, {
      width: '500px',
      data: {
        title: title,
        msg: message
      }
    });

    return dialogRef.afterClosed();
  }

  openDialogOk(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogOkComponent, {
      width: '500px',
      data: {
        title: title,
        msg: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Usuário fechou o diálogo Ok');
    });
  }
}
