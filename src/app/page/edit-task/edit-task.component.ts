import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.taskId = +params['id'];
    //   this.getTask();
    // });
  }

  // getTask(): void {
  //   this.taskService.getTaskById(this.taskId)
  //     .subscribe(task => this.task = task);
  // }

  updateTask(): void {
  console.log("Update OK");
  }

  cancelEdit() {
    console.log("cancelar");
  }
}
