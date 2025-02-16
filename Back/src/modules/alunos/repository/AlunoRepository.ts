import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AlunoSchema } from "../dto/AlunoSchema";
import { Aluno } from "../models/Aluno";
import { IAlunoRepository } from "../Interface/IAlunoRepository";

@injectable()
export class AlunoRepository implements IAlunoRepository {
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
  async list(adm_id: number, limit: number, offset: number): Promise<Aluno[]> {
    const query = "SELECT * FROM alunos WHERE adm_id = ? LIMIT ? OFFSET ?;";
    const result = await this.db.raw(query, [adm_id, limit, offset]);

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
    UPDATE alunos SET name = ?, date_of_birth = ?, email = ?, telephone = ?, cpf = ?, plan_id = ?, health_notes = ?, status = ?, gender = ?  
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
    const query = `
      UPDATE alunos
      SET status = false
      WHERE id = ? AND adm_id = ?`;
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

  async listByFrequency(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Aluno[]> {
    const id = Number(adm_id);
    const query = `
    SELECT a.id, a.name, COUNT(p.id) AS total_presencas
    FROM presenca p
    INNER JOIN alunos a ON p.aluno_id = a.id
    WHERE a.adm_id = ?
    GROUP BY a.id
    ORDER BY total_presencas DESC
    OFFSET ? LIMIT ?
    `;
    const result = await this.db.raw(query, [id, offset, limit]);
    return result.rows;
  }

  async getEmail(adm_id: number): Promise<string[]> {
    const query = "SELECT email FROM alunos WHERE adm_id = ? AND status = true";
    const result = await this.db.raw(query, [adm_id]);

    return result.rows.map((alunoData: any) => alunoData.email);
  }

  async listRecentRecords(adm_id: number, offset: number, limit: number) {
    const query = `
      SELECT id, name
      FROM alunos
      WHERE adm_id = ?
      ORDER BY created_at DESC
      OFFSET ? LIMIT ?
    `;

    const result = await this.db.raw(query, [adm_id, offset, limit]);
    return result.rows;
  }

  async listRecentFrequency(adm_id: number, offset: number, limit: number) {
    const query = `
    SELECT a.id, a.name
    FROM alunos a
    INNER JOIN presenca p ON p.aluno_id = a.id 
    WHERE a.adm_id = ? 
    ORDER BY p.data DESC
    OFFSET ? LIMIT ?
    `;

    const result = await this.db.raw(query, [adm_id, offset, limit]);
    return result.rows;
  }
}
