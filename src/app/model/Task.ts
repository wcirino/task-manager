export class Task {
  id: number;
  titulo: string;
  descricao: string;
  dt_criacao: Date;
  dt_conclusao: Date;
  dt_limite: Date;
  prioridade: string;
  responsavel: string;
  status: string;

  constructor(
    id: number,
    titulo: string,
    descricao: string,
    dtCriacao: Date,
    dtConclusao: Date,
    dt_limite: Date,
    prioridade: string,
    responsavel: string,
    status: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.dt_criacao = dtCriacao;
    this.dt_conclusao = dtConclusao;
    this.dt_limite = dt_limite;
    this.prioridade = prioridade;
    this.responsavel = responsavel;
    this.status = status;
  }
}
