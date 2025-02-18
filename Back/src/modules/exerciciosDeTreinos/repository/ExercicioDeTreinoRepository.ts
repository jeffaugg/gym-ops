import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { ExercicioDeTreinoSchema } from "../dto/ExercicioDeTreinoSchema";
import { ExerciciosDeTreinos } from "../models/ExerciciosDeTreinos";
import { IExercicioDeTreinoRepository } from "../interface/IExercicioDeTreinoRepository";

@injectable()
export class ExercicioDeTreinoRepository
  implements IExercicioDeTreinoRepository
{
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof ExercicioDeTreinoSchema>,
  ): Promise<ExerciciosDeTreinos> {
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

  async list(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<ExerciciosDeTreinos[]> {
    const query = `
      SELECT exercicios_de_treinos.* 
      FROM exercicios_de_treinos
      JOIN treinos ON exercicios_de_treinos.treino_id = treinos.id
      WHERE treinos.adm_id = ?
      OFFSET ? LIMIT ?`;
    const result = await this.db.raw(query, [adm_id, offset, limit]);

    return result.rows.map((data: any) =>
      ExerciciosDeTreinos.fromDatabase(data),
    );
  }

  async findById(id: number): Promise<ExerciciosDeTreinos | null> {
    const query = "SELECT * FROM exercicios_de_treinos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as ExerciciosDeTreinos;
  }

  async exerciseInWorkouts(
    exercicio_id: number,
    adm_id: number,
  ): Promise<boolean> {
    const query = `
      SELECT 1
      FROM exercicios_de_treinos et
      INNER JOIN exercicios e ON e.id = et.exercicio_id
      WHERE et.exercicio_id = ? AND e.adm_id = ?
      LIMIT 1;
      `;

    const result = await this.db.raw(query, [exercicio_id, adm_id]);

    return result.rows.length > 0 ? true : false;
  }

  async findByTreinoId(
    treino_id: number,
    offset: number,
    limit: number,
  ): Promise<ExerciciosDeTreinos[]> {
    const query =
      "SELECT * FROM exercicios_de_treinos WHERE treino_id = ? OFFSET ? LIMIT ? ";
    const result = await this.db.raw(query, [treino_id, offset, limit]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      return null;
    }

    return result.rows.map((data: any) =>
      ExerciciosDeTreinos.fromDatabase(data),
    );
  }

  async doesRelationExist(
    treino_id: number,
    exercicio_id: number,
    adm_id: number,
  ): Promise<boolean> {
    const query = `
    SELECT 1 
      FROM exercicios_de_treinos edt
      INNER JOIN exercicios e ON edt.exercicio_id = e.id
      INNER JOIN treinos t ON edt.treino_id = t.id
      WHERE (t.adm_id = ? OR e.adm_id = ?)
        AND edt.treino_id = ?
        AND edt.exercicio_id = ?
      LIMIT 1;
    `;

    const result = await this.db.raw(query, [
      adm_id,
      adm_id,
      treino_id,
      exercicio_id,
    ]);
    return result.rows.length > 0;
  }

  async update(
    exercicio_treino_id: number,
    data: z.infer<typeof ExercicioDeTreinoSchema>,
  ): Promise<ExerciciosDeTreinos> {
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
      exercicio_treino_id,
    ]);

    return result.rows[0] as ExerciciosDeTreinos;
  }

  async delete(exercicio_treino_id: number): Promise<void> {
    const query = "DELETE FROM exercicios_de_treinos WHERE id = ?";
    await this.db.raw(query, [exercicio_treino_id]);
  }
}
