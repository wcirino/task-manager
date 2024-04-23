import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskRouterModule } from './components/task-router.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: 'task',
    loadChildren: () => import('./components/task.module').then(m => m.TaskModule)
  }
    // ,
  // {
  //   path: 'beneficiario',
  //   loadChildren: () => import('./modulos/beneficiario/beneficiario/beneficiarioto.module').then(m => m.BeneficiariotoModule)
  // },
  // {
  //   path: 'consulta',
  //   loadChildren: () => import('./modulos/consultas/consulta/consulta.module').then(m => m.ConsultaModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Adiciona TaskRouterModule aos imports
  exports: [RouterModule]
})
export class AppRoutingModule { }
