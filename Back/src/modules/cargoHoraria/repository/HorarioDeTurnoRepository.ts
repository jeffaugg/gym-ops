import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { HorarioDeTurno } from "../models/HorarioDeTurno";
import { IHorarioDeTurnoRepository } from "../interface/IHorarioDeTurnoRepository";

@injectable()
export class HorarioDeTurnoRepository implements IHorarioDeTurnoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async list(): Promise<HorarioDeTurno[]> {
    const query = `SELECT * FROM horarios`;
    const result = await this.db.raw(query);
    return result.rows.map((data: any) => HorarioDeTurno.fromDatabase(data));
  }
}
