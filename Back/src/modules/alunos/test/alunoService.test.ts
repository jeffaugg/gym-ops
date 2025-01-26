import "reflect-metadata";
import { AlunoService } from "../service/AlunoService";
import { AlunoRepository } from "../repository/AlunoRepository";
import UserRepository from "../../user/repositories/UserRepository";
import { PlanoRepository } from "../../planos/repository/PlanoRepository";
import { mock, MockProxy } from "jest-mock-extended";
import AppError from "../../../shared/errors/AppError";

describe("AlunoService", () => {
  let alunoRepository: MockProxy<AlunoRepository>;
  let planoRepository: MockProxy<PlanoRepository>;
  let userRepository: MockProxy<UserRepository>;
  let alunoService: AlunoService;

  beforeEach(() => {
    alunoRepository = mock<AlunoRepository>();
    planoRepository = mock<PlanoRepository>();
    userRepository = mock<UserRepository>();

    alunoService = new AlunoService(
      alunoRepository,
      planoRepository,
      userRepository,
    );
  });

  describe("create", () => {
    it("should create a new aluno", async () => {
      const mockAdm = {
        id: 1,
        name: "test",
        email: "test@email.com",
        password: "123456",
        checkPassword: null,
        cpf: "12345678990",
        tel: "123",
        adm_id: 1,
        role: "ADM",
      };

      const mockAlunoData = {
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Healthy",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: null,
        adm_id: 1,
        created_at: null,
      };
      const mockPlano = {
        id: 1,
        name: "Plano Teste",
        adm_id: 1,
        price: 50,
        duration: 30,
        spots: 30,
        created_at: null,
      };

      userRepository.findById.mockResolvedValue(mockAdm);
      alunoRepository.findByEmail.mockResolvedValue(null);
      alunoRepository.findByCpf.mockResolvedValue(null);
      planoRepository.findById.mockResolvedValue(mockPlano);
      alunoRepository.create.mockResolvedValue({ id: 1, ...mockAlunoData });

      const result = await alunoService.create(mockAlunoData, 1);

      expect(result).toEqual({ id: 1, ...mockAlunoData });
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(alunoRepository.findByEmail).toHaveBeenCalledWith(
        mockAlunoData.email,
        1,
      );
      expect(alunoRepository.findByCpf).toHaveBeenCalledWith(
        mockAlunoData.cpf,
        1,
      );
      expect(planoRepository.findById).toHaveBeenCalledWith(
        mockAlunoData.plan_id,
        1,
      );
      expect(alunoRepository.create).toHaveBeenCalledWith({
        ...mockAlunoData,
        adm_id: 1,
      });
    });

    it("should throw an error if the admin is invalid", async () => {
      userRepository.findById.mockResolvedValue(null);

      const mockAlunoData = {
        name: "Test User",
        email: "test@example.com",
        cpf: "12345678900",
        plan_id: 1,
        health_notes: "Healthy",
      };

      await expect(alunoService.create(mockAlunoData, 1)).rejects.toThrow(
        new AppError("Administrador inválido", 404),
      );
    });
  });

  describe("list", () => {
    it("should list all alunos", async () => {
      const mockAluno = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Healthy",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: "F",
        adm_id: 1,
        created_at: null,
      };

      alunoRepository.list.mockResolvedValue([mockAluno]);

      const result = await alunoService.list(1);

      expect(result).toEqual([mockAluno]);
      expect(alunoRepository.list).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update an existing aluno", async () => {
      const mockAlunoData = {
        name: "Updated User",
        email: "updated@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Updated Health Notes",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: null,
        adm_id: 1,
        created_at: null,
      };

      const mockAluno = { ...mockAlunoData, id: 1 };
      const mockPlano = {
        id: 1,
        name: "Plano Teste",
        adm_id: 1,
        price: 50,
        duration: 30,
        spots: 30,
        created_at: null,
      };

      alunoRepository.findById.mockResolvedValue(mockAluno);
      alunoRepository.findByEmail.mockResolvedValue(null);
      alunoRepository.findByCpf.mockResolvedValue(null);
      planoRepository.findById.mockResolvedValue(mockPlano);
      alunoRepository.update.mockResolvedValue(mockAluno);

      const result = await alunoService.update(1, 1, mockAlunoData);

      expect(result).toEqual(mockAluno);
      expect(alunoRepository.findById).toHaveBeenCalledWith(1, 1);
      expect(planoRepository.findById).toHaveBeenCalledWith(1, 1);
      expect(alunoRepository.update).toHaveBeenCalledWith(1, 1, mockAlunoData);
    });

    it("should throw an error if aluno not found", async () => {
      alunoRepository.findById.mockResolvedValue(null);

      const mockAlunoData = {
        name: "Updated User",
        email: "updated@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Updated Health Notes",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: null,
      };

      await expect(alunoService.update(1, 1, mockAlunoData)).rejects.toThrow(
        new AppError("Aluno não encontrado", 404),
      );
    });

    it("should throw an error if CPF already registered", async () => {
      const mockAlunoData = {
        name: "Updated User",
        email: "updated@example.com",
        plan_id: 1,
        health_notes: "Updated Health Notes",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: null,
        adm_id: 1,
        created_at: null,
      };
      const mockAluno = { ...mockAlunoData, id: 1, cpf: "123.456.789-00" };
      const mockPlano = {
        id: 1,
        name: "Plano Teste",
        adm_id: 1,
        price: 50,
        duration: 30,
        spots: 30,
        created_at: null,
      };

      planoRepository.findById.mockResolvedValue(mockPlano);

      alunoRepository.findById.mockResolvedValue({
        ...mockAlunoData,
        id: 2,
        cpf: "123.456.789-23",
      });
      alunoRepository.findByCpf.mockResolvedValue({
        ...mockAlunoData,
        id: 2,
        cpf: "123.456.789-00",
      });

      await expect(alunoService.update(1, 1, mockAluno)).rejects.toThrow(
        new AppError("CPF já cadastrado", 409),
      );
    });
  });

  describe("findById", () => {
    it("should find aluno by id", async () => {
      const mockAluno = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Healthy",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: "F",
        adm_id: 1,
        created_at: null,
      };

      alunoRepository.findById.mockResolvedValue(mockAluno);

      const result = await alunoService.findById(1, 1);

      expect(result).toEqual(mockAluno);
      expect(alunoRepository.findById).toHaveBeenCalledWith(1, 1);
    });

    it("should throw an error if aluno not found", async () => {
      alunoRepository.findById.mockResolvedValue(null);

      await expect(alunoService.findById(1, 1)).rejects.toThrow(
        new AppError("Aluno não encontrado", 404),
      );
    });
  });

  describe("delete", () => {
    it("should delete an existing aluno", async () => {
      const mockAluno = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Healthy",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: "F",
        adm_id: 1,
        created_at: null,
      };

      alunoRepository.findById.mockResolvedValue(mockAluno);
      alunoRepository.delete.mockResolvedValue(undefined);

      await alunoService.delete(1, 1);

      expect(alunoRepository.findById).toHaveBeenCalledWith(
        mockAluno.id,
        mockAluno.adm_id,
      );
      expect(alunoRepository.delete).toHaveBeenCalledWith(
        mockAluno.id,
        mockAluno.adm_id,
      );
    });

    it("should throw an error if aluno not found", async () => {
      alunoRepository.findById.mockResolvedValue(null);

      await expect(alunoService.delete(1, 1)).rejects.toThrow(
        new AppError("Aluno não encontrado", 404),
      );
    });
  });

  describe("findByCpf", () => {
    it("should find aluno by cpf", async () => {
      const mockAluno = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Healthy",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: "F",
        adm_id: 1,
        created_at: null,
      };

      alunoRepository.findByCpf.mockResolvedValue(mockAluno);

      const result = await alunoService.findByCpf("123.456.789-00", 1);

      expect(result).toEqual(mockAluno);
      expect(alunoRepository.findByCpf).toHaveBeenCalledWith(
        "123.456.789-00",
        1,
      );
    });

    it("should throw an error if aluno not found by cpf", async () => {
      alunoRepository.findByCpf.mockResolvedValue(null);

      await expect(alunoService.findByCpf("123.456.789-00", 1)).rejects.toThrow(
        new AppError("Aluno não encontrado", 404),
      );
    });
  });

  describe("findByEmail", () => {
    it("should find aluno by email", async () => {
      const mockAluno = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-00",
        plan_id: 1,
        health_notes: "Healthy",
        date_of_birth: "2004-02-12",
        telephone: "(88) 98128-2456",
        status: true,
        gender: "F",
        adm_id: 1,
        created_at: null,
      };

      alunoRepository.findByEmail.mockResolvedValue(mockAluno);

      const result = await alunoService.findByEmail("test@example.com", 1);

      expect(result).toEqual(mockAluno);
      expect(alunoRepository.findByEmail).toHaveBeenCalledWith(
        "test@example.com",
        1,
      );
    });

    it("should throw an error if aluno not found by email", async () => {
      alunoRepository.findByEmail.mockResolvedValue(null);

      await expect(
        alunoService.findByEmail("test@example.com", 1),
      ).rejects.toThrow(new AppError("Aluno não encontrado", 404));
    });
  });
});
