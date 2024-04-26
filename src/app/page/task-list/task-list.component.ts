import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { TaskService } from 'src/app/services/task.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['titulo', 'descricao', 'dt_criacao', 'dt_conclusao', 'dt_limite', 'prioridade', 'responsavel', 'status', 'action'];
  totalElements = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
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
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }


  // ngAfterViewInit() {
  //   // Configurar o paginator depois que a exibição da visão foi inicializada
  //   this.paginator.page
  //     .pipe(
  //       tap(() => this.chamarMetodoGetAll())
  //     )
  //     .subscribe();
  // }
}
