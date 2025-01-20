export class DiaDaSemana {
  id: number;
  dayOfWeek: string;

  constructor(id: number, dayOfWeek: string) {
    this.id = id;
    this.dayOfWeek = dayOfWeek;
  }

  static fromDatabase(data: any): DiaDaSemana {
    return new DiaDaSemana(data.id, data.day_week);
  }
}
