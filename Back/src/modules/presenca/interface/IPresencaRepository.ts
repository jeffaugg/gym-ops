import Presenca from "../models/Presenca";

export interface IPresencaRepository {
  create(id: number): Promise<Presenca>;
  presenceAlredyExists(aluno_id: number, adm_id: number): Promise<boolean>;
  findByAlunoId(aluno_id: number, adm_id: number): Promise<Presenca[]>;
  findById(id: number, adm_id: number): Promise<Presenca | null>;
  getAll(adm_id: number, offset: number, limit: number): Promise<Presenca[]>;
  delete(id: number): Promise<void>;
  listWeekFrequencies(adm_id: number): Promise<Presenca[]>;
}
