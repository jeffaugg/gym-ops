import { Avaliacao } from "../models/Avaliacao";
import { z } from "zod";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";

export interface IAvaliacoesRepository {
  create(
    data: z.infer<typeof AvaliacoesSchema> & { id: number },
  ): Promise<Avaliacao>;

  list(adm_id: number, offset: number, limit: number): Promise<Avaliacao[]>;

  findByAlunoId(
    aluno_id: number,
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Avaliacao[]>;

  findById(id: string, adm_id: number): Promise<Avaliacao | null>;

  update(
    id: number,
    data: z.infer<typeof AvaliacoesSchema>,
  ): Promise<Avaliacao>;

  delete(id: number): Promise<void>;
}
