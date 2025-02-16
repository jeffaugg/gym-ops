import { HorarioDeTurno } from "../models/HorarioDeTurno";

export interface IHorarioDeTurnoRepository {
  list(): Promise<HorarioDeTurno[]>;
}
