import { DiaDaSemana } from "../models/DiaDaSemana";

export interface IDiaDaSemanaRepository {
  list(): Promise<DiaDaSemana[]>;
}
