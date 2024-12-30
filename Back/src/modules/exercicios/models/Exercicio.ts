export class Exercicio {
  id: number;
  name: string;
  muscles: string;
  adm_id: number;

  public constructor(
    id: number,
    name: string,
    muscles: string,
    adm_id: number,
  ) {
    this.id = id;
    this.name = name;
    this.muscles = muscles;
    this.adm_id = adm_id;
  }

  static fromDatabase(data: any): Exercicio {
    return new Exercicio(data.id, data.name, data.muscles, data.adm_id);
  }
}
