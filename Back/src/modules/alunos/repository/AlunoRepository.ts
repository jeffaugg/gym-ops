import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AlunoSchema } from "../dto/AlunoSchema";
import { Aluno } from "../models/Aluno";

@injectable()
export class AlunoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof AlunoSchema> & {
      adm_id: number;
    },
  ): Promise<Aluno> {
    const query = `
      INSERT INTO alunos (name, date_of_birth, email, telephone, cpf, plan_id, health_notes, status, gender, adm_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id, name, date_of_birth, email, telephone, cpf, plan_id, health_notes, status, gender, adm_id, created_at;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.date_of_birth,
      data.email,
      data.telephone,
      data.cpf,
      data.plan_id,
      data.health_notes,
      true,
      data.gender,
      data.adm_id,
    ]);

    return Aluno.fromDatabase(result.rows[0]);
  }
  async list(adm_id: number): Promise<Aluno[]> {
    const query = "SELECT * FROM alunos WHERE adm_id = ? AND status = true";
    const result = await this.db.raw(query, [adm_id]);

    return result.rows.map((alunoData: any) => Aluno.fromDatabase(alunoData));
  }

  async findById(id: number, adm_id: number): Promise<Aluno | null> {
    const query = "SELECT * FROM alunos WHERE id = ? AND adm_id = ?";
    const result = await this.db.raw(query, [id, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Aluno.fromDatabase(result.rows[0]);
  }

  async findByEmail(email: string, adm_id: number): Promise<Aluno | null> {
    const query = "SELECT * FROM alunos WHERE email = ? AND adm_id = ?";
    const result = await this.db.raw(query, [email, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Aluno.fromDatabase(result.rows[0]);
  }

  async findByCpf(cpf: string, adm_id: number): Promise<Aluno | null> {
    const query = "SELECT * FROM alunos WHERE cpf = ? AND adm_id = ?";
    const result = await this.db.raw(query, [cpf, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }
    const alunoData = result.rows[0];
    return Aluno.fromDatabase(alunoData);
  }

  async update(
    id: number,
    adm_id: number,
    data: z.infer<typeof AlunoSchema>,
  ): Promise<Aluno> {
    const query = `
    UPDATE alunos SET name = ?, date_of_birth = ?, email = ?, telephone = ?, cpf = ?, plan_id = ?, health_notes = ?, status = ? ,gender = ?  
    WHERE id = ? AND adm_id = ? 
    RETURNING id, name, date_of_birth, email, telephone, cpf, plan_id, health_notes, status, gender, created_at `;

    const result = await this.db.raw(query, [
      data.name,
      data.date_of_birth,
      data.email,
      data.telephone,
      data.cpf,
      data.plan_id,
      data.health_notes,
      data.status,
      data.gender,
      id,
      adm_id,
    ]);

    return result.rows[0] as Aluno;
  }

  async delete(id: number, adm_id: number): Promise<void> {
    const query = "DELETE FROM alunos WHERE id = ? AND adm_id = ?";
    await this.db.raw(query, [id, adm_id]);
  }

  async findByPlanId(plan_id: number, adm_id: number): Promise<Aluno[] | null> {
    const query = "SELECT * FROM alunos WHERE plan_id = ? AND adm_id = ?";
    const result = await this.db.raw(query, [plan_id, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows.map((alunoData: any) => Aluno.fromDatabase(alunoData));
  }
}
