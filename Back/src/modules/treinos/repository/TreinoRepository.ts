import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { TreinoSchema } from "../dto/TreinoSchema";
import { Treino } from "../models/Treino";

@injectable()
export class TreinoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof TreinoSchema> & {
      adm_id: number;
    },
  ): Promise<Treino> {
    const query = `
      INSERT INTO treinos (name, notes, adm_id)
      VALUES (?, ?, ?)
      RETURNING id, name, notes, adm_id;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.notes,
      data.adm_id,
    ]);

    return Treino.fromDatabase(result.rows[0]);
  }

  async list(adm_id: number): Promise<Treino[]> {
    const query = "SELECT * FROM treinos WHERE adm_id = ?";
    const result = await this.db.raw(query, [adm_id]);

    return result.rows.map((TreinoData: any) =>
      Treino.fromDatabase(TreinoData),
    );
  }

  async findById(id: number, adm_id: number): Promise<Treino | null> {
    const query = "SELECT * FROM treinos WHERE id = ? AND adm_id = ?";
    const result = await this.db.raw(query, [id, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Treino.fromDatabase(result.rows[0]);
  }

  async findByName(name: string, adm_id: number): Promise<Treino | null> {
    const query = "SELECT * FROM treinos WHERE name = ? AND adm_id = ?";
    const result = await this.db.raw(query, [name, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }
    return Treino.fromDatabase(result.rows[0]);
  }

  async update(
    id: number,
    adm_id: number,
    data: z.infer<typeof TreinoSchema>,
  ): Promise<Treino> {
    const query = `
    UPDATE treinos SET name = ?, notes = ? 
    WHERE id = ? AND adm_id = ?
    RETURNING id, name, notes `;

    const result = await this.db.raw(query, [
      data.name,
      data.notes,
      id,
      adm_id,
    ]);

    return result.rows[0] as Treino;
  }

  async delete(id: number, adm_id: number): Promise<void> {
    const query = "DELETE FROM treinos WHERE id = ? AND adm_id = ?";
    await this.db.raw(query, [id, adm_id]);
  }
}
