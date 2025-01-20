export class Aluno {
  id: number;
  name: string;
  date_of_birth: string;
  email: string;
  telephone: string;
  cpf: string;
  plan_id: number;
  health_notes: string;
  status: boolean;
  gender: string;
  adm_id: number;
  created_at: Date;

  public constructor(
    id: number,
    name: string,
    date_of_birth: string,
    email: string,
    telephone: string,
    cpf: string,
    plan_id: number,
    health_notes: string,
    status: boolean,
    gender: string,
    adm_id: number,
    created_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.email = email;
    this.telephone = telephone;
    this.cpf = cpf;
    this.plan_id = plan_id;
    this.health_notes = health_notes;
    this.status = status;
    this.gender = gender;
    this.adm_id = adm_id;
    this.created_at = created_at;
  }

  static fromDatabase(data: any): Aluno {
    return new Aluno(
      data.id,
      data.name,
      data.date_of_birth,
      data.email,
      data.telephone,
      data.cpf,
      data.plan_id,
      data.health_notes,
      data.status,
      data.gender,
      data.adm_id,
      new Date(data.created_at),
    );
  }
}
