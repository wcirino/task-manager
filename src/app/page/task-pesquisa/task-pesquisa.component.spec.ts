import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPesquisaComponent } from './task-pesquisa.component';

describe('TaskPesquisaComponent', () => {
  let component: TaskPesquisaComponent;
  let fixture: ComponentFixture<TaskPesquisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPesquisaComponent]
    });
    fixture = TestBed.createComponent(TaskPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
