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
import { DialogService } from 'src/app/shared/util/DialogService';
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
              private snackBarService: SnackbarService,
              private dialogService: DialogService) { }

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
    //this.openDialogOk();
  }

  concluirTarefa(){
    console.log("Tarefa concluída!!");
  }

  // openDialogSimNao(): void {
  //   this.dialogService.openDialogSimNao('Título', 'Mensagem de aviso.').subscribe(result => {
  //     if (result === true) {
  //       console.log('Usuário clicou em Sim');
  //     } else {
  //       console.log('Usuário clicou em Não ou fechou o diálogo');
  //     }
  //   });
  // }

  openDialogSimNao(task: Task): void {
    //console.log(task);
    const dialogRef = this.dialog.open(DialogSimNaoComponent, {
      width: '500px',
      data: {
        title: 'Confirmar ação',
        msg: `Tem certeza que deseja concluir a tarefa: '${task.titulo}'?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Usuário clicou em Sim');
        // Aqui você pode realizar a ação de conclusão da tarefa usando 'task'
        // Por exemplo: this.concluirTarefa(task);
      } else {
        console.log('Usuário clicou em Não ou fechou o diálogo');
      }
    });
  }


  openDialogOk(): void {
    this.dialogService.openDialogOk('Título', 'Mensagem informativa.');
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

