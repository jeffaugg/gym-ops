export class CargoHoraria {
  id: number;
  user_id: number;
  dia_id: number;
  horario_id: number;

  constructor(user_id: number, dia_id: number, horario_id: number) {
    this.user_id = user_id;
    this.dia_id = dia_id;
    this.horario_id = horario_id;
  }

  static fromDatabase(data: any): CargoHoraria {
    return new CargoHoraria(data.user_id, data.dia_id, data.horario_id);
  }
}
