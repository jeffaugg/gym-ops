import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { ExercicioSchema } from "../dto/ExercicioSchema";
import { Exercicio } from "../models/Exercicio";

@injectable()
export class ExercicioRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof ExercicioSchema>): Promise<Exercicio> {
    const query = `
      INSERT INTO exercicios (name, muscles)
      VALUES (?, ?)
      RETURNING id, name, muscles;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.muscles
    ]);

    return result.rows[0] as Exercicio;
  }

  async list(): Promise<Exercicio[]> {
    const query = "SELECT * FROM exercicios";
    const result = await this.db.raw(query);

    return result.rows.map((ExercicioData: any) => Exercicio.fromDatabase(ExercicioData));
  }

  async findById(id: number): Promise<Exercicio | null> {
    const query = "SELECT * FROM exercicios WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Exercicio.fromDatabase(result.rows[0]);
  }

  async findByName(name: string): Promise<Exercicio | null> {
    const query = "SELECT * FROM exercicios WHERE name = ?";
    const result = await this.db.raw(query, [name]);

    if (result.rows.length === 0) {
      return null;
    }
    const ExercicioData = result.rows[0];
    return Exercicio.fromDatabase(ExercicioData);
  }

  async update(id: number, data: z.infer<typeof ExercicioSchema>): Promise<Exercicio> {
    const query = `
    UPDATE exercicios SET name = ?, muscles = ? 
    WHERE id = ? 
    RETURNING id, name, muscles `;

    const result = await this.db.raw(query, [
      data.name,
      data.muscles
    ]);

    return result.rows[0] as Exercicio;
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM exercicios WHERE id = ?";
    await this.db.raw(query, [id]);
  }
}
