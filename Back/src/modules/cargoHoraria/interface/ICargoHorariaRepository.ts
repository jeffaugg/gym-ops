import { CargoHoraria } from "../models/CargoHoraria";

export interface ICargoHorariaRepository {
  create(data: {
    user_id: number;
    dia_id: number;
    horario_id: number;
  }): Promise<CargoHoraria>;
  delete(user_id: number): Promise<void>;
  listNow(
    admin_id: number,
    offset: number,
    limit: number,
  ): Promise<CargoHoraria[]>;
}
