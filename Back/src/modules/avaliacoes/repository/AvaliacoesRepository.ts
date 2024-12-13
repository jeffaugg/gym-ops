import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { Avaliacao } from "../models/Avaliacao";
import { z } from "zod";

@injectable()
export class AvaliacoesRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof AvaliacoesSchema>): Promise<Avaliacao> {
    const query = `
    INSERT INTO avaliacoes (
    aluno_id, instructor_id, height, weight, fat_mass, lean_mass,left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING id, aluno_id, instructor_id, date, height, weight, fat_mass, lean_mass, left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip;
`;
    const result = await this.db.raw(query, [
      data.aluno_id,
      data.instructor_id,
      data.height,
      data.weight,
      data.fat_mass,
      data.lean_mass,
      data.left_arm_relaxed,
      data.right_arm_relaxed,
      data.left_arm_contracted,
      data.right_arm_contracted,
      data.left_thigh,
      data.right_thigh,
      data.left_calf,
      data.right_calf,
      data.chest,
      data.abdomen,
      data.waist,
      data.hip,
    ]);

    return result.rows[0] as Avaliacao;
  }

  async list(): Promise<Avaliacao[]> {
    const query = `
    SELECT * FROM avaliacoes;
    `;
    const result = await this.db.raw(query);

    return result.rows.map((avaliacaoData: any) =>
      Avaliacao.fromDatabase(avaliacaoData),
    );
  }

  async findByAlunoId(aluno_id: string): Promise<Avaliacao[]> {
    const query = `
    SELECT * FROM avaliacoes WHERE aluno_id = ?;
    `;
    const result = await this.db.raw(query, [aluno_id]);

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows.map((avaliacaoData: any) =>
      Avaliacao.fromDatabase(avaliacaoData),
    );
  }

  async findById(id: string): Promise<Avaliacao> {
    const query = `
    SELECT * FROM avaliacoes WHERE id = ?;
    `;
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Avaliacao.fromDatabase(result.rows[0]);
  }

  async update(
    id: number,
    data: z.infer<typeof AvaliacoesSchema>,
  ): Promise<Avaliacao> {
    const query = `
    UPDATE avaliacoes SET height = ?, weight = ?, fat_mass = ?, lean_mass = ?, left_arm_relaxed = ?, right_arm_relaxed = ?, left_arm_contracted = ?, right_arm_contracted = ?, left_thigh = ?, right_thigh = ?, left_calf = ?, right_calf = ?, chest = ?, abdomen = ?, waist = ?, hip = ?
    WHERE id = ?
    RETURNING id, aluno_id, instructor_id, date, height, weight, fat_mass, lean_mass, left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip
    `;
    const result = await this.db.raw(query, [
      data.height,
      data.weight,
      data.fat_mass,
      data.lean_mass,
      data.left_arm_relaxed,
      data.right_arm_relaxed,
      data.left_arm_contracted,
      data.right_arm_contracted,
      data.left_thigh,
      data.right_thigh,
      data.left_calf,
      data.right_calf,
      data.chest,
      data.abdomen,
      data.waist,
      data.hip,
      id,
    ]);

    return result.rows[0] as Avaliacao;
  }

  async delete(id: number): Promise<void> {
    const query = `
    DELETE FROM avaliacoes WHERE id = ?;
    `;
    await this.db.raw(query, [id]);
  }
}
