import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/Task';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskResponse } from 'src/app/model/taskReponse';

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
    private formBuilder: FormBuilder) { }

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


  limpar(): void {
    this.form.reset();
  }
  
  alterarTarefa(task: Task): void {
    console.log("Alterando!!");
  }

  openDialogDelete(task: Task): void {
    console.log("Deletando!!");
  }

  openDialogSimNao(task: Task): void {
    console.log("Concluindo!!");
  }
}
