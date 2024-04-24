import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './page/add-task/add-task.component';
import { EditTaskComponent } from './page/edit-task/edit-task.component';


const routes: Routes = [
  {
    path: "",
    component: AddTaskComponent
  },
  {
    path: "task",
    component: EditTaskComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
