import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/Task';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskResponse } from 'src/app/model/taskReponse';
import { DialogSimNaoComponent } from 'src/app/shared/components/dialog-sim-nao/dialog-sim-nao.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/util/SnackbarService ';
import { DialogService } from 'src/app/shared/util/DialogService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-pesquisa',
  templateUrl: './task-pesquisa.component.html',
  styleUrls: ['./task-pesquisa.component.scss']
})
export class TaskPesquisaComponent implements OnInit {
  form!: FormGroup;
  idForm!: FormControl;
  tituloForm!: FormControl;
  descricaoForm!: FormControl;
  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'descricao', 'dt_criacao', 'dt_conclusao', 'dt_limite', 'prioridade', 'responsavel', 'status', 'action'];
  totalElements = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 25];

  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private snackBarService: SnackbarService,
              private dialogService: DialogService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.searchTasksInicializar();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      titulo: [null],
      descricao: [null]
    });

    this.idForm = this.form.controls['id'] as FormControl;
    this.tituloForm = this.form.controls['titulo'] as FormControl;
    this.descricaoForm = this.form.controls['descricao'] as FormControl;
  }

  searchTasks(page: number = 0, size: number = this.pageSize): void {
    let searchParams: any = {};
  
    if (this.idForm.value !== null && this.idForm.value !== '') {
      searchParams.id = this.idForm.value;
    }
  
    if (this.tituloForm.value !== null && this.tituloForm.value !== '') {
      searchParams.title = this.tituloForm.value;
    }
  
    if (this.descricaoForm.value !== null && this.descricaoForm.value !== '') {
      searchParams.description = this.descricaoForm.value;
    }
  
    searchParams.page = page;
    searchParams.size = size;
  
    if (Object.keys(searchParams).length > 0) {
      this.taskService.searchTasks(searchParams)
        .subscribe({
          next: (tasks) => {
            this.tasks = tasks.content;
            this.totalElements = tasks.totalElements;
          },
          error: (error: any) => {
            console.error("Erro ao buscar tarefas:", error);
          }
        });
    }
  }
  
  
  

  searchTasksInicializar(): void {
    const searchParams = {
      page: 0,
      size: 8
    };

    this.taskService.searchTasks(searchParams)
      .subscribe({
        next: (response) => {
          this.tasks = response.content;
          this.totalElements = response.totalElements;

        },
        error: (error) => {
          console.error("Erro ao buscar tarefas:", error);
        }
      });
  }
  
  handlePage(event: any): void {
    const selectedPage = event.pageIndex + 1;
    this.searchTasks(selectedPage);
  }

  limpar(): void {
    this.form.reset();
  }
  
  alterarTarefa(task: Task){
    console.log("Alterando!!");
    this.openDialogAlterar(task.id); 
  }
  
  openDialogAlterar(taskId: number): void {
    const dialogRef = this.dialog.open(DialogSimNaoComponent, {
      width: '500px',
      data: {
        title: 'Confirmar alteração',
        msg: `Tem certeza que deseja alterar a tarefa?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Usuário confirmou a alteração');
        
        this.router.navigate(['/task/alterar', taskId]);
      } else {
        console.log('Usuário cancelou a alteração');
      }
    });
  }

  deletarTarefa(){
    console.log("Deletando!!");
    this.exibirSnackbarSucesso();
  }

  concluirTarefa(taskId: number){
    console.log("Tarefa concluída!!");
    this.taskService.concluirTask(taskId).subscribe({
      next: updatedTask => {
        console.log('Tarefa atualizada:', updatedTask);
   
        this.searchTasksInicializar();
        this.exibirSnackbarSucesso();
      },
      error: error => {
        console.error('Erro ao concluir tarefa:', error);
        this.exibirSnackbarErro();
      }
    });
  }

  deleteTarefa(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log('Tarefa excluída com sucesso');
        
        this.searchTasksInicializar();
        this.exibirSnackbarSucesso();
      },
      error: error => {
        console.error('Erro ao excluir tarefa:', error);
        this.exibirSnackbarErro();
      }
    });
  }

  openDialogSimNao(task: Task): void {
    const dialogRef = this.dialog.open(DialogSimNaoComponent, {
      width: '500px',
      data: {
        title: 'Confirmar ação',
        msg: `Tem certeza que deseja concluir a tarefa:<br>'${task.titulo}'?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Usuário clicou em Sim');
        this.concluirTarefa(task.id);
      } else {
        console.log('Usuário clicou em Não ou fechou o diálogo');
      }
    });
  }

  openDialogDelete(task: Task): void {
    const dialogRef = this.dialog.open(DialogSimNaoComponent, {
      width: '500px',
      data: {
        title: 'Confirmar exclusão',
        msg: `Tem certeza que deseja excluir a tarefa: '${task.titulo}'?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Usuário clicou em Sim');
        this.deleteTarefa(task.id);
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
