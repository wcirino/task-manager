import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { TaskService } from 'src/app/services/task.service';
import { SnackbarService } from 'src/app/shared/util/SnackbarService ';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  form!: FormGroup;

  tituloForm!: FormControl;
  descricaoForm!: FormControl;
  dt_criacaoForm!: FormControl;
  dt_conclusaoForm!: FormControl;
  dt_limiteForm!: FormControl;
  prioridadeForm!: FormControl;
  responsavelForm!: FormControl;
  statusForm!: FormControl;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.initForm();
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

    this.dt_criacaoForm.disable();
  }

  criarNovaTarefa(): void {
    const formValues = this.form.value;
    const hoje: Date = new Date();
    const novaTarefaDTO = {
      titulo: formValues.titulo,
      descricao: formValues.descricao,
      dt_Criacao: hoje,
      dt_Conclusao: formValues.dt_conclusao,
      dt_limite: formValues.dt_limite,
      prioridade: formValues.prioridade,
      responsavel: formValues.responsavel,
      status: formValues.status
    };
  
    this.taskService.createTask(novaTarefaDTO)
      .subscribe(
        () => {
          this.exibirSnackbarSucesso();
          this.router.navigate(['/']); 
        },
        (error) => {
          this.exibirSnackbarErro();
          console.error('Erro ao criar a tarefa:', error);
        }
      );
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
  
}
