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
    dt_Criacao: Date,
    dt_Conclusao: Date,
    dt_limite: Date,
    prioridade: string,
    responsavel: string,
    status: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.dt_criacao = dt_Criacao;
    this.dt_conclusao = dt_Conclusao;
    this.dt_limite = dt_limite;
    this.prioridade = prioridade;
    this.responsavel = responsavel;
    this.status = status;
  }
}
