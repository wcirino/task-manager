import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { TaskDTO } from 'src/app/model/TaskDTO';
import { TaskService } from 'src/app/services/task.service';
import { SnackbarService } from 'src/app/shared/util/SnackbarService ';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  task!: Task;
  form!: FormGroup;


  tituloForm!: FormControl;
  descricaoForm!: FormControl;
  dt_criacaoForm!: FormControl;
  dt_conclusaoForm!: FormControl;
  dt_limiteForm!: FormControl;
  prioridadeForm!: FormControl;
  responsavelForm!: FormControl;
  statusForm!: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToRouteParams();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      titulo: [null],
      descricao: [null],
      dt_criacao: [null],
      dt_conclusao: [null],
      dt_limite: [null],
      prioridade: [null],
      responsavel: [null],
      status: [null]
    });

    this.tituloForm = this.form.controls['titulo'] as FormControl;
    this.descricaoForm = this.form.controls['descricao'] as FormControl;
    this.dt_criacaoForm = this.form.controls['dt_criacao'] as FormControl;
    this.dt_conclusaoForm = this.form.controls['dt_conclusao'] as FormControl;
    this.dt_limiteForm = this.form.controls['dt_limite'] as FormControl;
    this.prioridadeForm = this.form.controls['prioridade'] as FormControl;
    this.responsavelForm = this.form.controls['responsavel'] as FormControl;
    this.statusForm = this.form.controls['status'] as FormControl;
  }

  subscribeToRouteParams(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      this.getTaskById(this.taskId);
    });
  }

  getTaskById(id: number): void {
    this.taskService.getTaskById(id)
      .subscribe(task => {
        this.task = task;
        this.fillFormControls(task); 
      });
  }

  fillFormControls(task: Task): void {
    this.tituloForm.setValue(task.titulo);
    this.descricaoForm.setValue(task.descricao);
    this.dt_criacaoForm.setValue(task.dt_limite);
    this.dt_conclusaoForm.setValue(task.dt_limite);
    this.dt_limiteForm.setValue(task.dt_limite);
    this.prioridadeForm.setValue(task.prioridade);
    this.responsavelForm.setValue(task.responsavel);
    this.statusForm.setValue(task.status);
  }

  updateTask(id: number): void {
    const formValues = this.form.value;
    const updatedTask: TaskDTO = {
      id: id,
      titulo: formValues.titulo,
      descricao: formValues.descricao,
      dt_criacao: this.task.dt_criacao, 
      dt_conclusao: formValues.dt_conclusao,
      dt_limite: formValues.dt_limite,
      prioridade: formValues.prioridade,
      responsavel: formValues.responsavel,
      status: formValues.status
    };
  
    this.taskService.updateTask(id, updatedTask)
      .subscribe(() => {
        console.log("Tarefa atualizada com sucesso!");
        this.exibirSnackbarSucesso(); 
        this.navegarParaPaginaPrincipal(); 
      }, error => {
        console.error("Erro ao atualizar a tarefa:", error);
        this.exibirSnackbarErro();
      });
  }

  cancelEdit(): void {
    console.log("Cancelar edição");
  }

  concluirTask(id: number): void {
    this.taskService.concluirTask(id)
      .subscribe(() => {
        console.log("Tarefa concluída com sucesso!");
      }, error => {
        console.error("Erro ao concluir a tarefa:", error);
      });
  }

  exibirSnackbarErro(): void {
    this.snackbarService.showError('Mensagem de erro! ❌');
  }

  exibirSnackbarSucesso(): void {
    this.snackbarService.showSuccess('Operação realizada com sucesso! 🎉');
  }

  exibirSnackbarPadrao(): void {
    this.snackbarService.showDefault('Mensagem padrão. ℹ️');
  }

  navegarParaPaginaPrincipal(): void {
    setTimeout(() => {
        this.router.navigate(['/']);
    }, 6000); 
  }

}
