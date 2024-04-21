import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';



@NgModule({
  declarations: [
    AddTaskComponent,
    EditTaskComponent,
    TaskDetailsComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddTaskComponent,
    EditTaskComponent,
    TaskDetailsComponent,
    TaskListComponent
  ]
})
export class TaskModule { }
