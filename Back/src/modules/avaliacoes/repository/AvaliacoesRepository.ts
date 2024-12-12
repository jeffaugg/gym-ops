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
    aluno_id, instructor_id, height, weight, fat_mass, lean_mass,left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING id, aluno_id, instructor_id, date, height, weight, fat_mass, lean_mass, left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen;
`;

    const result = await this.db.raw<Avaliacao>(query, [
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
    ]);

    return result;
  }
}
