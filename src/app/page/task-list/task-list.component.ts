import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { TaskService } from 'src/app/services/task.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogSimNaoComponent } from 'src/app/shared/components/dialog-sim-nao/dialog-sim-nao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMensagemComponent } from 'src/app/shared/components/snackbar-mensagem/snackbar-mensagem.component';
import { SnackbarService } from 'src/app/shared/util/SnackbarService ';
// import { DialogAnimationsExampleDialog } from './dialog-animations-example-dialog'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['id','titulo', 'descricao', 'dt_criacao', 'dt_conclusao', 'dt_limite', 'prioridade', 'responsavel', 'status', 'action'];
  totalElements = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 20, 25];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private snackBarService: SnackbarService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.chamarMetodoGetAll())
      )
      .subscribe();
    this.chamarMetodoGetAll();
  }

  async chamarMetodoGetAll() {
    try {
      if (!this.paginator) {
        console.error('Paginator não encontrado!');
        return;
      }

      const tasksResponse: any = await this.taskService.getAllTasks(this.paginator.pageIndex, this.paginator.pageSize).toPromise();
      if (tasksResponse) {
        this.tasks = tasksResponse.content;
        this.totalElements = tasksResponse.totalElements;
        console.log("task: " + tasksResponse.content);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }

  alterarTarefa(){
    console.log("Alterando!!");
  }

  deletarTarefa(){
    console.log("Deletando!!");
    //this.openSnackBar();
    //this.exibirSnackbarErro();
    this.exibirSnackbarSucesso();
  }

  concluirTarefa(){
    console.log("Tarefa concluída!!");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSimNaoComponent, {
      width: '500px',
      data: {
        parameter1: 'value1',
        parameter2: 'value2',
        parameter3: 'value3'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Usuário clicou em Sim');
      } else {
        console.log('Usuário clicou em Não ou fechou o diálogo');
      }
    });
  }

  openSnackBar2() {
    this._snackBar.open('Realizar avaliação de desempenho dos funcionários <br> do departamento de vendas.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top', // Define a posição vertical
      horizontalPosition: 'center', // Define a posição horizontal // Tempo em milissegundos (3 segundos)
    });
  }
  
  openSnackBar() {
    const message = 'Realizar avaliação de desempenho dos funcionários <br> do departamento de vendas.';
    const action = 'Fechar';
    const title = 'Aviso'; 

    const snackbarRef = this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
      panelClass: ['custom-snackbar'], 
    });

   
    snackbarRef.onAction().subscribe(() => {
      snackbarRef.dismiss(); 
      this.openCustomSnackBar(title); 
    });
  }

  openCustomSnackBar(title: string) {
    this._snackBar.open(title, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'],
    });
  }
  exibirSnackbarErro() {
    this.snackBarService.showError('Mensagem de erro! ❌');
  }

  exibirSnackbarSucesso() {
    this.snackBarService.showSuccess('Operação realizada com sucesso! 🎉');
  }

  exibirSnackbarPadrao() {
    this.snackBarService.showDefault('Mensagem padrão. ℹ️');
  }


}

