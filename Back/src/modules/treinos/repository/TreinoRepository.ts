import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { TreinoSchema } from "../dto/TreinoSchema";
import { Treino } from "../models/Treino";

@injectable()
export class TreinoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof TreinoSchema>): Promise<Treino> {
    const query = `
      INSERT INTO treinos (name, notes)
      VALUES (?, ?)
      RETURNING id, name, notes;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.notes
    ]);

    return result.rows[0] as Treino;
  }

  async list(): Promise<Treino[]> {
    const query = "SELECT * FROM treinos";
    const result = await this.db.raw(query);

    return result.rows.map((TreinoData: any) => Treino.fromDatabase(TreinoData));
  }

  async findById(id: number): Promise<Treino | null> {
    const query = "SELECT * FROM treinos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Treino.fromDatabase(result.rows[0]);
  }

  async findByName(name: string): Promise<Treino | null> {
    const query = "SELECT * FROM treinos WHERE name = ?";
    const result = await this.db.raw(query, [name]);

    if (result.rows.length === 0) {
      return null;
    }
    const exercicioData = result.rows[0];
    return Treino.fromDatabase(exercicioData);
  }

  async update(id: number, data: z.infer<typeof TreinoSchema>): Promise<Treino> {
    const query = `
    UPDATE treinos SET name = ?, notes = ? 
    WHERE id = ? 
    RETURNING id, name, notes `;

    const result = await this.db.raw(query, [
      data.name,
      data.notes
    ]);

    return result.rows[0] as Treino;
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM treinos WHERE id = ?";
    await this.db.raw(query, [id]);
  }
}
