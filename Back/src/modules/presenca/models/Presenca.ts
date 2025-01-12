class Presenca {
  id: number;
  aluno_id: number;
  data: Date;

  constructor(id: number, aluno_id: number, data: Date) {
    this.id = id;
    this.aluno_id = aluno_id;
    this.data = data;
  }
  static fromDatabase(data: any): Presenca {
    return new Presenca(data.id, data.aluno_id, data.data);
  }
}

export default Presenca;
