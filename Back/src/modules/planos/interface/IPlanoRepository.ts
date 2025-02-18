import Plano from "../models/Plano";
import { z } from "zod";
import { PlanoSchema } from "../dto/PlanoSchema";

export interface IPlanoRepository {
  create(
    data: z.infer<typeof PlanoSchema> & { adm_id: number },
  ): Promise<Plano>;
  list(adm_id: number, offset: number, limit: number): Promise<Plano[]>;
  findById(id: number, adm_id: number): Promise<Plano | null>;
  findByIdWithoutAdm(id: number): Promise<Plano | null>;
  findByName(name: string, adm_id: number): Promise<Plano | null>;
  findByDuration(duration: number, adm_id: number): Promise<Plano | null>;
  update(
    id: number,
    data: z.infer<typeof PlanoSchema>,
    adm_id: number,
  ): Promise<Plano>;
  delete(id: number, adm_id: number): Promise<void>;
}
