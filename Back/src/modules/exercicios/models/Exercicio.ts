export class Exercicio {
    id: number;
    name: string;
    muscles: string;
  
    public constructor(
      id: number,
      name: string,
      muscles: string,
    ) {
      this.id = id;
      this.name = name;
      this.muscles = muscles;
    }
  
    static fromDatabase(data: any): Exercicio {
      return new Exercicio(
        data.id,
        data.name,
        data.muscles
      );
    }
  }
  