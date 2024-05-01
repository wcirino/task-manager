import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarMensagemComponent } from './snackbar-mensagem.component';

describe('SnackbarMensagemComponent', () => {
  let component: SnackbarMensagemComponent;
  let fixture: ComponentFixture<SnackbarMensagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackbarMensagemComponent]
    });
    fixture = TestBed.createComponent(SnackbarMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
