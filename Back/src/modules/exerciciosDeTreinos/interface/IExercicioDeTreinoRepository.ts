import { ExerciciosDeTreinos } from "../models/ExerciciosDeTreinos";
import { z } from "zod";
import { ExercicioDeTreinoSchema } from "../dto/ExercicioDeTreinoSchema";

export interface IExercicioDeTreinoRepository {
  create(
    data: z.infer<typeof ExercicioDeTreinoSchema>,
  ): Promise<ExerciciosDeTreinos>;
  list(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<ExerciciosDeTreinos[]>;
  findById(id: number): Promise<ExerciciosDeTreinos | null>;
  exerciseInWorkouts(exercicio_id: number, adm_id: number): Promise<boolean>;
  findByTreinoId(
    treino_id: number,
    offset: number,
    limit: number,
  ): Promise<ExerciciosDeTreinos[] | null>;
  doesRelationExist(
    treino_id: number,
    exercicio_id: number,
    adm_id: number,
  ): Promise<boolean>;
  update(
    exercicio_treino_id: number,
    data: z.infer<typeof ExercicioDeTreinoSchema>,
  ): Promise<ExerciciosDeTreinos>;
  delete(exercicio_treino_id: number): Promise<void>;
}
