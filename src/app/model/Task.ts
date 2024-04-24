export class Task {
  id: number;
  titulo: string;
  descricao: string;
  dt_criacao: Date;
  dt_conclusao: Date;
  dt_limite: Date;
  prioridade: number;
  responsavel: number;
  status: number;

  constructor(
    id: number,
    titulo: string,
    descricao: string,
    dt_criacao: Date,
    dt_conclusao: Date,
    dt_limite: Date,
    prioridade: number,
    responsavel: number,
    status: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.dt_criacao = dt_criacao;
    this.dt_conclusao = dt_conclusao;
    this.dt_limite = dt_limite;
    this.prioridade = prioridade;
    this.responsavel = responsavel;
    this.status = status;
  }
}
