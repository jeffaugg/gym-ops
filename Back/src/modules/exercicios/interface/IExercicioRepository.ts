import { Exercicio } from "../models/Exercicio";
import { z } from "zod";
import { ExercicioSchema } from "../dto/ExercicioSchema";

export interface IExercicioRepository {
  create(
    data: z.infer<typeof ExercicioSchema> & { adm_id: number },
  ): Promise<Exercicio>;
  list(adm_id: number, offset: number, limit: number): Promise<Exercicio[]>;
  findById(id: number, adm_id: number): Promise<Exercicio | null>;
  findByName(name: string, adm_id: number): Promise<Exercicio | null>;
  update(
    id: number,
    adm_id: number,
    data: z.infer<typeof ExercicioSchema>,
  ): Promise<Exercicio>;
  delete(id: number, adm_id: number): Promise<void>;
}
