import { Aluno } from "../models/Aluno";
import { z } from "zod";
import { AlunoSchema } from "../dto/AlunoSchema";

export interface IAlunoRepository {
  create(
    data: z.infer<typeof AlunoSchema> & { adm_id: number },
  ): Promise<Aluno>;
  list(adm_id: number, limit: number, offset: number): Promise<Aluno[]>;
  findById(id: number, adm_id: number): Promise<Aluno | null>;
  findByEmail(email: string, adm_id: number): Promise<Aluno | null>;
  findByCpf(cpf: string, adm_id: number): Promise<Aluno | null>;
  update(
    id: number,
    adm_id: number,
    data: z.infer<typeof AlunoSchema>,
  ): Promise<Aluno>;
  delete(id: number, adm_id: number): Promise<void>;
  findByPlanId(plan_id: number, adm_id: number): Promise<Aluno[] | null>;
  listByFrequency(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Aluno[]>;
  getEmail(adm_id: number): Promise<string[]>;
  listRecentRecords(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Aluno[]>;
  listRecentFrequency(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Aluno[]>;
}
