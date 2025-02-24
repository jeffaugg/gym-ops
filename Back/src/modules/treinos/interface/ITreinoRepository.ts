import { Treino } from "../models/Treino";
import { z } from "zod";
import { TreinoSchema } from "../dto/TreinoSchema";

export interface ITreinoRepository {
  create(
    data: z.infer<typeof TreinoSchema> & { adm_id: number },
  ): Promise<Treino>;
  list(adm_id: number, offset: number, limit: number): Promise<Treino[]>;
  findById(id: number, adm_id: number): Promise<Treino | null>;
  findByName(name: string, adm_id: number): Promise<Treino | null>;
  update(
    id: number,
    adm_id: number,
    data: z.infer<typeof TreinoSchema>,
  ): Promise<Treino>;
  delete(id: number, adm_id: number): Promise<void>;
}
