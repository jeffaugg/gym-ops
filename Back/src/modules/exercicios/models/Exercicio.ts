export class Exercicio {
    id: number;
    name: string;
    muscles: string;
    created_at: Date;
  
    public constructor(
      id: number,
      name: string,
      muscles: string,
      created_at: Date,
    ) {
      this.id = id;
      this.name = name;
      this.muscles = muscles;
      this.created_at = created_at;
    }
  
    // static fromDatabase(data: any): Aluno {
    //   return new Aluno(
    //     data.id,
    //     data.name,
    //     data.date_of_birth,
    //     data.email,
    //     data.telephone,
    //     data.cpf,
    //     data.plan_id,
    //     new Date(data.created_at),
    //   );
    // }
  }
  