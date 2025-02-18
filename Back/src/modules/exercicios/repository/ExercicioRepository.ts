import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { ExercicioSchema } from "../dto/ExercicioSchema";
import { Exercicio } from "../models/Exercicio";
import { IExercicioRepository } from "../interface/IExercicioRepository";

@injectable()
export class ExercicioRepository implements IExercicioRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof ExercicioSchema> & {
      adm_id: number;
    },
  ): Promise<Exercicio> {
    const query = `
      INSERT INTO exercicios (name, muscles, adm_id)
      VALUES (?, ?, ?)
      RETURNING id, name, muscles, adm_id;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.muscles,
      data.adm_id,
    ]);

    return Exercicio.fromDatabase(result.rows[0]);
  }

  async list(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Exercicio[]> {
    const query = "SELECT * FROM exercicios WHERE adm_id = ? OFFSET ? LIMIT ?;";

    const result = await this.db.raw(query, [adm_id, offset, limit]);

    return result.rows.map((ExercicioData: any) =>
      Exercicio.fromDatabase(ExercicioData),
    );
  }

  async findById(id: number, adm_id: number): Promise<Exercicio | null> {
    const query = "SELECT * FROM exercicios WHERE id = ? AND adm_id = ?";
    const result = await this.db.raw(query, [id, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Exercicio.fromDatabase(result.rows[0]);
  }

  async findByName(name: string, adm_id: number): Promise<Exercicio | null> {
    const query = "SELECT * FROM exercicios WHERE name = ? AND adm_id = ?";
    const result = await this.db.raw(query, [name, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }
    return Exercicio.fromDatabase(result.rows[0]);
  }

  async update(
    id: number,
    adm_id: number,
    data: z.infer<typeof ExercicioSchema>,
  ): Promise<Exercicio> {
    const query = `
    UPDATE exercicios SET name = ?, muscles = ? 
    WHERE id = ? AND adm_id = ? 
    RETURNING id, name, muscles `;

    const result = await this.db.raw(query, [
      data.name,
      data.muscles,
      id,
      adm_id,
    ]);

    return Exercicio.fromDatabase(result.rows[0]);
  }

  async delete(id: number, adm_id: number): Promise<void> {
    const query = "DELETE FROM exercicios WHERE id = ? AND adm_id = ?";
    await this.db.raw(query, [id, adm_id]);
  }
}
