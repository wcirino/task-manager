import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  tasks2: Task[] = [];
  displayedColumns: string[] = ['titulo', 'descricao', 'dt_criacao', 'dt_conclusao', 'dt_limite', 'prioridade', 'responsavel', 'status'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks(1, 10).subscribe((response: any) => {
      this.tasks = response.content;
    });
        
    this.chamarMetodoGetAll();
    //this.chamarMetodoCreateTask();
  }

  async chamarMetodoGetAll() {
    try {
      const tasksResponse = await this.taskService.getAllTasks(1, 10).toPromise();
      if (tasksResponse) {
        this.tasks = tasksResponse;
        console.log('Tarefas:', this.tasks);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }

  async chamarMetodoCreateTask() {
    try {
      const novaTarefaJson = {
        titulo: 'Elaboração de Relatório de Vendas',
        descricao: 'Elaborar relatório de vendas mensal para análise de desempenho.',
        dt_criacao: '2024-05-10 00:00:00',
        dt_conclusao: null,
        dt_limite: '2024-05-24T00:00:00',
        prioridade: 2,
        responsavel: 4,
        status: 0
      };
      
      const createdTask = await this.taskService.createTask(novaTarefaJson).toPromise();
      
      if (createdTask) {
        console.log('Tarefa criada:', createdTask);
        // Você pode atualizar a lista de tarefas aqui, se necessário
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }
}
