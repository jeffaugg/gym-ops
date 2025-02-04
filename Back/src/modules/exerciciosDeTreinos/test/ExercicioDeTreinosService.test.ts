import "reflect-metadata";
import { ExercicioDeTreinoService } from "../service/ExercicioDeTreinosService"; // caminho correto para o service
import { ExercicioDeTreinoRepository } from "../repository/ExercicioDeTreinoRepository";
import { ExercicioRepository } from "../../exercicios/repository/ExercicioRepository";
import { TreinoRepository } from "../../treinos/repository/TreinoRepository";
import { mock, MockProxy } from "jest-mock-extended";
import AppError from "../../../shared/errors/AppError";
import { ExerciciosDeTreinos } from "../models/ExerciciosDeTreinos";
import { Treino } from "../../treinos/models/Treino";
import { Exercicio } from "../../exercicios/models/Exercicio";

describe("ExercicioDeTreinoService", () => {
  let exercicioDeTreinoService: ExercicioDeTreinoService;
  let exercicioDeTreinoRepository: MockProxy<ExercicioDeTreinoRepository>;
  let exercicioRepository: MockProxy<ExercicioRepository>;
  let treinoRepository: MockProxy<TreinoRepository>;

  beforeEach(() => {
    exercicioDeTreinoRepository = mock<ExercicioDeTreinoRepository>();
    exercicioRepository = mock<ExercicioRepository>();
    treinoRepository = mock<TreinoRepository>();

    exercicioDeTreinoService = new ExercicioDeTreinoService(
      exercicioDeTreinoRepository,
      exercicioRepository,
      treinoRepository,
    );
  });

  it("should throw an error if treino is not found", async () => {
    treinoRepository.findById.mockResolvedValue(null);
    const data = {
      treino_id: 1,
      exercicio_id: 1,
      series: 3,
      repeticoes: 15,
      descanso_segundos: 60,
    };

    await expect(exercicioDeTreinoService.create(data, 1)).rejects.toThrowError(
      new AppError("Treino não encontrado", 404),
    );
  });

  it("should throw an error if exercicio is not found", async () => {
    treinoRepository.findById.mockResolvedValue(
      new Treino(1, "legs", "hard", 1),
    );
    exercicioRepository.findById.mockResolvedValue(null);

    const data = {
      treino_id: 1,
      exercicio_id: 1,
      series: 3,
      repeticoes: 15,
      descanso_segundos: 60,
    };

    await expect(exercicioDeTreinoService.create(data, 1)).rejects.toThrowError(
      new AppError("Exercício não encontrado", 404),
    );
  });

  it("should throw an error if the exercise is already associated with the workout", async () => {
    treinoRepository.findById.mockResolvedValue(
      new Treino(1, "legs", "hard", 1),
    );

    exercicioRepository.findById.mockResolvedValue(
      new Exercicio(1, "Bulgarian", "legs", 1),
    );

    exercicioDeTreinoRepository.findByTreinoId.mockResolvedValue(
      new ExerciciosDeTreinos(1, 1, 1, 4, 12, 60),
    );

    const data = {
      treino_id: 1,
      exercicio_id: 1,
      series: 3,
      repeticoes: 15,
      descanso_segundos: 60,
    };

    await expect(exercicioDeTreinoService.create(data, 1)).rejects.toThrowError(
      new AppError("Esse exercício já está associado a este treino", 409),
    );
  });

  it("should successfully create a new exercise relation", async () => {
    treinoRepository.findById.mockResolvedValue(
      new Treino(1, "legs", "hard", 1),
    );
    exercicioRepository.findById.mockResolvedValue(
      new Exercicio(1, "Bulgarian", "legs", 1),
    );

    exercicioDeTreinoRepository.findByTreinoId.mockResolvedValue(null);

    const createdRelation = new ExerciciosDeTreinos(1, 1, 1, 3, 15, 60);
    exercicioDeTreinoRepository.create.mockResolvedValue(createdRelation);

    const data = {
      treino_id: 1,
      exercicio_id: 1,
      series: 3,
      repeticoes: 15,
      descanso_segundos: 60,
    };

    const result = await exercicioDeTreinoService.create(data, 1);

    expect(result).toEqual(createdRelation);
  });

  it("should list exercises associated with a workout", async () => {
    const mockRelations = [new ExerciciosDeTreinos(1, 1, 1, 3, 15, 60)];

    exercicioDeTreinoRepository.list.mockResolvedValue(mockRelations);

    const result = await exercicioDeTreinoService.list(1);

    expect(result).toEqual(mockRelations);
  });
});
