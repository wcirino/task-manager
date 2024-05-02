import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
// import { MatTableModule } from '@angular/material/table';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatCardModule } from  '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { AddTaskComponent } from './page/add-task/add-task.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { EditTaskComponent } from './page/edit-task/edit-task.component';
import { DeleteTaskComponent } from './page/delete-task/delete-task.component';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

// import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskPesquisaComponent } from './page/task-pesquisa/task-pesquisa.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { RedDirective } from './directives/red.directive';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSimNaoComponent } from './shared/components/dialog-sim-nao/dialog-sim-nao.component';
import { SnackbarMensagemComponent } from './shared/components/snackbar-mensagem/snackbar-mensagem.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogOkComponent } from './shared/components/dialog-ok/dialog-ok.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    AddTaskComponent,
    TaskListComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    TaskPesquisaComponent,
    DialogSimNaoComponent,
    SnackbarMensagemComponent,
    DialogOkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule  
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
