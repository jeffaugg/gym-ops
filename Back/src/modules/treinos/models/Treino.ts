export class Treino {
  id: number;
  name: string;
  notes: string;
  user_id: number;

  public constructor(id: number, name: string, notes: string, user_id: number) {
    this.id = id;
    this.name = name;
    this.notes = notes;
    this.user_id = user_id;
  }

  static fromDatabase(data: any): Treino {
    return new Treino(data.id, data.name, data.notes, data.user_id);
  }
}
