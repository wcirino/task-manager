import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/Task';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    const searchParams = {
      id: this.idForm.value,
      title: this.tituloForm.value,
      description: this.descricaoForm.value,
      page: page, 
      size: size 
    };
  
    this.taskService.searchTasks(searchParams)
      .subscribe(tasks => {
        // this.tasks = tasks; 
        // this.totalElements = tasks.length; 
      });
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
