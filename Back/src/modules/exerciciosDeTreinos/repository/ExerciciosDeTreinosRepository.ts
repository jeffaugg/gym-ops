import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { ExerciciosDeTreinosSchema } from "../dto/ExerciciosDeTreinosSchema";
import { ExerciciosDeTreinos } from "../models/ExerciciosDeTreinos";

@injectable()
export class ExerciciosDeTreinosRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof ExerciciosDeTreinosSchema>): Promise<ExerciciosDeTreinos> {
    const query = `
      INSERT INTO exercicios_de_treinos (treino_id, exercicio_id, series, repeticoes, descanso_segundos)
      VALUES (?, ?, ?, ?, ?)
      RETURNING treino_id, exercicio_id, series, repeticoes, descanso_segundos;
    `;

    const result = await this.db.raw(query, [
      data.treinoId,
      data.exercicioId,
      data.series,
      data.repeticoes,
      data.descanso_segundos,
    ]);

    return ExerciciosDeTreinos.fromDatabase(result.rows[0]);
  }

  async list(): Promise<ExerciciosDeTreinos[]> {
    const query = "SELECT * FROM exercicios_de_treinos";
    const result = await this.db.raw(query);

    return result.rows.map((data: any) => ExerciciosDeTreinos.fromDatabase(data));
  }

  async findById(id: number): Promise<ExerciciosDeTreinos | null> {
    const query = "SELECT * FROM exercicios_de_treinos WHERE treino_id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return ExerciciosDeTreinos.fromDatabase(result.rows[0]);
  }

  async findByTreinoId(exercicioId: number): Promise<ExerciciosDeTreinos | null> {
    const query = "SELECT * FROM exercicios_de_treinos WHERE treino_id = ?";
    const result = await this.db.raw(query, [exercicioId]);

    if (result.rows.length === 0) {
      return null;
    }

    return ExerciciosDeTreinos.fromDatabase(result.rows[0]);
  }

  async update(exercicio_treino_id: number, data: z.infer<typeof ExerciciosDeTreinosSchema>): Promise<ExerciciosDeTreinos> {
    const query = `
      UPDATE exercicios_de_treinos 
      SET series = ?, repeticoes = ?, descanso_segundos = ?, treino_id = ?, exercicio_id=?
      WHERE id = ?
      RETURNING treino_id, exercicio_id, series, repeticoes, descanso_segundos;
    `;

    const result = await this.db.raw(query, [
      data.series,
      data.repeticoes,
      data.descanso_segundos,
      data.treinoId,
      data.exercicioId,
    ]);

    return ExerciciosDeTreinos.fromDatabase(result.rows[0]);
  }

  async delete(exercicio_treino_id: number): Promise<void> {
    const query = "DELETE FROM exercicios_de_treinos WHERE id = ?";
    await this.db.raw(query, [exercicio_treino_id]);
  }
}