import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-pesquisa',
  templateUrl: './task-pesquisa.component.html',
  styleUrls: ['./task-pesquisa.component.scss']
})
export class TaskPesquisaComponent implements OnInit{

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
   


  }

 

}
