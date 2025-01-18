export class TreinoDeAluno {
  id: number;
  aluno_id: number;
  treino_id: number;

  public constructor(id: number, aluno_id: number, treino_id: number) {
    this.id = id;
    this.aluno_id = aluno_id;
    this.treino_id = treino_id;
  }

  static fromDatabase(data: any): TreinoDeAluno {
    return new TreinoDeAluno(data.id, data.aluno_id, data.treino_id);
  }
}
