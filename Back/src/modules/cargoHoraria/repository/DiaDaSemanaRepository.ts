import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { DiaDaSemana } from "../models/DiaDaSemana";
import { IDiaDaSemanaRepository } from "../interface/IDiaDaSemanaRepository";

@injectable()
export class DiaDaSemanaRepository implements IDiaDaSemanaRepository {
  constructor(@inject("Database") private db: Knex) {}

  async list(): Promise<DiaDaSemana[]> {
    const query = `SELECT * FROM dias`;
    const result = await this.db.raw(query);
    return result.rows.map((data: any) => DiaDaSemana.fromDatabase(data));
  }
}
