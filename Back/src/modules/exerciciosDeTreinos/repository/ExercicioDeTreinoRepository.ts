import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { ExercicioDeTreinoSchema } from "../dto/ExercicioDeTreinoSchema";
import { ExerciciosDeTreinos } from "../models/ExerciciosDeTreinos";

@injectable()
export class ExercicioDeTreinoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof ExercicioDeTreinoSchema>): Promise<ExerciciosDeTreinos> {
    const query = `
      INSERT INTO exercicios_de_treinos (treino_id, exercicio_id, series, repeticoes, descanso_segundos)
      VALUES (?, ?, ?, ?, ?)
      RETURNING id, treino_id, exercicio_id, series, repeticoes, descanso_segundos;
    `;
    const result = await this.db.raw(query, [
      data.treino_id,
      data.exercicio_id,
      data.series,
      data.repeticoes,
      data.descanso_segundos,
    ]);

    return result.rows[0] as ExerciciosDeTreinos;
  }

  async list(): Promise<ExerciciosDeTreinos[]> {
    const query = "SELECT * FROM exercicios_de_treinos";
    const result = await this.db.raw(query);

    return result.rows.map((data: any) => ExerciciosDeTreinos.fromDatabase(data));
  }

  async findById(id: number): Promise<ExerciciosDeTreinos | null> {
    const query = "SELECT * FROM exercicios_de_treinos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as ExerciciosDeTreinos;
  }

  async findByTreinoId(treino_id: number): Promise<ExerciciosDeTreinos | null> {
    const query = "SELECT * FROM exercicios_de_treinos WHERE treino_id = ?";
    const result = await this.db.raw(query, [treino_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as ExerciciosDeTreinos;
  }

  async update(exercicio_treino_id: number, data: z.infer<typeof ExercicioDeTreinoSchema>): Promise<ExerciciosDeTreinos> {
    const query = `
      UPDATE exercicios_de_treinos 
      SET series = ?, repeticoes = ?, descanso_segundos = ?, treino_id = ?, exercicio_id=?
      WHERE id = ?
      RETURNING id, treino_id, exercicio_id, series, repeticoes, descanso_segundos;
    `;

    const result = await this.db.raw(query, [
      data.series,
      data.repeticoes,
      data.descanso_segundos,
      data.treino_id,
      data.exercicio_id,
      exercicio_treino_id
    ]);

    return result.rows[0] as ExerciciosDeTreinos;
  }

  async delete(exercicio_treino_id: number): Promise<void> {
    const query = "DELETE FROM exercicios_de_treinos WHERE id = ?";
    await this.db.raw(query, [exercicio_treino_id]);
  }
}