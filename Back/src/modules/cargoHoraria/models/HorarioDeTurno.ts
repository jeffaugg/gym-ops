export class HorarioDeTurno {
  id: number;
  start_time: string;
  end_time: string;

  constructor(id: number, start_time: string, end_time: string) {
    this.id = id;
    this.start_time = start_time;
    this.end_time = end_time;
  }

  static fromDatabase(data: any): HorarioDeTurno {
    return new HorarioDeTurno(data.id, data.start_time, data.end_time);
  }
}
