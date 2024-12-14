export class Treino {
    id: number;
    name: string;
    notes: string;
  
    public constructor(
      id: number,
      name: string,
      notes: string,
    ) {
      this.id = id;
      this.name = name;
      this.notes = notes;
    }
  
    static fromDatabase(data: any): Treino {
      return new Treino(
        data.id,
        data.name,
        data.notes
      );
    }
  }
  