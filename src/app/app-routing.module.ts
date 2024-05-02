import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './page/add-task/add-task.component';
import { EditTaskComponent } from './page/edit-task/edit-task.component';
import { HomeComponent } from './views/home/home.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { DeleteTaskComponent } from './page/delete-task/delete-task.component';
import { TaskPesquisaComponent } from './page/task-pesquisa/task-pesquisa.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "task",
    component: TaskListComponent
  },
  {
    path: "task/adicionar",
    component: AddTaskComponent
  },
  {
    path: "task/deletar",
    component: DeleteTaskComponent
  },
  {
    path: "task/alterar",
    component: EditTaskComponent
  },
  {
    path: 'task/alterar/:id',
    component: EditTaskComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
