import "reflect-metadata";
import { ExercicioService } from "../service/ExercicioService";
import { ExercicioRepository } from "../repository/ExercicioRepository";
import { UserRepository } from "../../user/repositories/UserRepository";
import AppError from "../../../shared/errors/AppError";
import { mock, MockProxy } from "jest-mock-extended";
import { Exercicio } from "../models/Exercicio";
import User from "../../user/models/User";

describe("ExercicioService", () => {
  let exercicioService: ExercicioService;
  let exercicioRepository: MockProxy<ExercicioRepository>;
  let userRepository: MockProxy<UserRepository>;

  beforeEach(() => {
    exercicioRepository = mock<ExercicioRepository>();
    userRepository = mock<UserRepository>();
    exercicioService = new ExercicioService(
      exercicioRepository,
      userRepository,
    );
  });

  describe("create", () => {
    it("should create an exercise successfully", async () => {
      const mockAdmId = 1;
      const mockData = new Exercicio(1, "Bulgarian", "legs", mockAdmId);

      userRepository.findById.mockResolvedValue(
        new User(
          1,
          1,
          "roger",
          "roger@gmail.com",
          "123",
          "123.123.123-12",
          "(88) 4002-8922",
          "USER",
        ),
      );
      exercicioRepository.findByName.mockResolvedValue(null);
      exercicioRepository.create.mockResolvedValue(mockData);

      const result = await exercicioService.create(mockData, mockAdmId);

      expect(result).toEqual(mockData);
      expect(exercicioRepository.create).toHaveBeenCalledWith({
        ...mockData,
        adm_id: mockAdmId,
      });
    });

    it("should throw an error if the admin is not found", async () => {
      const mockAdmId = 1;
      const mockData = {
        name: "Bulgarian",
        muscles: "legs",
      };

      userRepository.findById.mockResolvedValue(null);
      exercicioRepository.findByName.mockResolvedValue(null);
      exercicioRepository.create.mockResolvedValue(
        new Exercicio(1, mockData.name, mockData.muscles, mockAdmId),
      );

      await expect(
        exercicioService.create(mockData, mockAdmId),
      ).rejects.toThrowError(new AppError("Administrador inválido", 404));
    });

    it("should throw an error if the exercise name already exists", async () => {
      const mockAdmId = 1;
      const mockData = {
        name: "Bulgarian",
        muscles: "legs",
      };

      userRepository.findById.mockResolvedValue(
        new User(
          1,
          1,
          "roger",
          "roger@gmail.com",
          "123",
          "123.123.123-12",
          "(88) 4002-8922",
          "USER",
        ),
      );
      exercicioRepository.findByName.mockResolvedValue(
        new Exercicio(1, mockData.name, mockData.muscles, mockAdmId),
      );
      exercicioRepository.create.mockResolvedValue(
        new Exercicio(1, mockData.name, mockData.muscles, mockAdmId),
      );
      await expect(
        exercicioService.create(mockData, mockAdmId),
      ).rejects.toThrowError(
        new AppError("Já existe um exercício com esse nome", 409),
      );
    });
  });

  describe("list", () => {
    it("should list all exercises for an admin", async () => {
      const mockAdmId = 1;
      const mockExercises = [
        new Exercicio(1, "Bulgarian", "legs", 1),
        new Exercicio(2, "Bench Press", "chest", 1),
      ];
      exercicioRepository.list.mockResolvedValue(mockExercises);

      const result = await exercicioService.list(mockAdmId);

      expect(result).toEqual(mockExercises);
    });
  });

  describe("update", () => {
    it("should update an exercise successfully", async () => {
      const mockAdmId = 1;
      const mockData = { name: "Brench Press", muscles: "chest" };
      const mockExercise = new Exercicio(1, "Bulgarian", "legs", 1);

      exercicioRepository.findById.mockResolvedValue(mockExercise);
      exercicioRepository.update.mockResolvedValue({
        ...mockExercise,
        ...mockData,
      });

      const result = await exercicioService.update(1, mockAdmId, mockData);

      expect(result).toEqual({ ...mockExercise, ...mockData });
    });

    it("should throw an error if the exercise is not found", async () => {
      const mockAdmId = 1;
      const mockData = { name: "Exercício Atualizado" };

      exercicioRepository.findById.mockResolvedValue(null);

      await expect(
        exercicioService.update(1, mockAdmId, mockData),
      ).rejects.toThrowError(new AppError("Exercício não encontrado", 404));
    });
  });

  describe("findById", () => {
    it("should find an exercise by id", async () => {
      const mockAdmId = 1;
      const mockExercise = new Exercicio(1, "Bulgarian", "legs", mockAdmId);

      exercicioRepository.findById.mockResolvedValue(mockExercise);

      const result = await exercicioService.findById(1, mockAdmId);

      expect(result).toEqual(mockExercise);
    });

    it("should throw an error if the exercise is not found", async () => {
      const mockAdmId = 1;

      exercicioRepository.findById.mockResolvedValue(null);

      await expect(
        exercicioService.findById(1, mockAdmId),
      ).rejects.toThrowError(new AppError("Exercício não encontrado", 404));
    });
  });

  describe("delete", () => {
    it("should delete an exercise successfully", async () => {
      const mockAdmId = 1;
      const mockExercise = new Exercicio(1, "Bulgarian", "legs", mockAdmId);

      exercicioRepository.findById.mockResolvedValue(mockExercise);
      exercicioRepository.delete.mockResolvedValue(null);

      const result = await exercicioService.delete(1, mockAdmId);

      expect(result).toEqual(null);
      expect(exercicioRepository.delete).toHaveBeenCalledWith(1, mockAdmId);
    });

    it("should throw an error if the exercise is not found", async () => {
      const mockAdmId = 1;

      exercicioRepository.findById.mockResolvedValue(null);

      await expect(exercicioService.delete(1, mockAdmId)).rejects.toThrowError(
        new AppError("Exercício não encontrado", 404),
      );
    });
  });

  describe("findByName", () => {
    it("should find an exercise by name", async () => {
      const mockAdmId = 1;
      const mockExercise = new Exercicio(1, "Bulgarian", "legs", 1);

      exercicioRepository.findByName.mockResolvedValue(mockExercise);

      const result = await exercicioService.findByName(
        "Exercício 1",
        mockAdmId,
      );

      expect(result).toEqual(mockExercise);
    });

    it("should throw an error if the exercise is not found by name", async () => {
      const mockAdmId = 1;

      exercicioRepository.findByName.mockResolvedValue(null);

      await expect(
        exercicioService.findByName("Exercício Inexistente", mockAdmId),
      ).rejects.toThrowError(new AppError("Exercício não encontrado", 404));
    });
  });
});
