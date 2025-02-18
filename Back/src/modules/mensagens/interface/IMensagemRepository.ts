import { Mensagem } from "../models/Mensagem";
import { z } from "zod";
import { MensagemSchema } from "../dto/MensagemSchema";

export interface IMensagemRepository {
  create(
    data: z.infer<typeof MensagemSchema>,
    id_adm: number,
  ): Promise<Mensagem>;
  findById(id: number, id_adm: number): Promise<Mensagem | null>;
  list(id_adm: number, offset: number, limit: number): Promise<Mensagem[]>;
}
