import { TreinoDeAluno } from "../models/TreinoDeAluno";
import { z } from "zod";
import { TreinoDeAlunoSchema } from "../dto/TreinoDeAlunoSchema";

export interface ITreinoDeAlunoRepository {
  create(data: z.infer<typeof TreinoDeAlunoSchema>): Promise<TreinoDeAluno>;
  list(adm_id: number, offset: number, limit: number): Promise<TreinoDeAluno[]>;
  findById(id: number): Promise<TreinoDeAluno | null>;
  findByAlunoId(
    aluno_id: number,
    offset: number,
    limit: number,
  ): Promise<TreinoDeAluno | null>;
  doesRelationExist(
    aluno_id: number,
    treino_id: number,
    adm_id: number,
  ): Promise<boolean>;
  delete(treino_de_aluno_id: number): Promise<void>;
}
