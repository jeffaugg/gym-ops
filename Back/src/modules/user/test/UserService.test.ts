import { mock, MockProxy } from "jest-mock-extended";
import "reflect-metadata";
import UserRepository from "../repositories/UserRepository";
import { UserService } from "../service/UserService";
import { CargoHorariaService } from "../../cargoHoraria/service/CargoHorariaService";
import User from "../models/User";
import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";

describe("UserService", () => {
  let userRepository: MockProxy<UserRepository>;
  let cargoHorariaService: MockProxy<CargoHorariaService>;
  let userService: UserService;

  beforeAll(() => {
    userRepository = mock<UserRepository>();
    cargoHorariaService = mock<CargoHorariaService>();
    userService = new UserService(userRepository, cargoHorariaService);
  });

  describe("create Adm", () => {
    it("should create new userADM", async () => {
      const mockAdmData = {
        name: "teste123",
        email: "teste@g.com",
        password: "teste1234",
        cpf: "123.456.789-00",
        tel: "12345678345",
        role: "ADM" as const,
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(null);
      userRepository.createAdm.mockResolvedValue(
        User.fromDatabase({
          id: 1,
          adm_id: null,
          name: mockAdmData.name,
          email: mockAdmData.email,
          password: mockAdmData.password,
          cpf: mockAdmData.cpf,
          tel: mockAdmData.tel,
          role: mockAdmData.role,
        }),
      );

      const result = await userService.createAdm(mockAdmData);

      expect(result).toMatchObject({
        id: 1,
        adm_id: null,
        name: mockAdmData.name,
        email: mockAdmData.email,
        cpf: mockAdmData.cpf,
        tel: mockAdmData.tel,
        role: mockAdmData.role,
      });

      expect(userRepository.findByCpf).toHaveBeenLastCalledWith(
        "123.456.789-00",
      );
      expect(userRepository.findByEmail).toHaveBeenLastCalledWith(
        "teste@g.com",
      );
    });

    it("should not create a userADM if the email is already registered", async () => {
      const mockAdmData = {
        name: "teste123",
        email: "teste@g.com",
        password: "teste1234",
        cpf: "123.456.789-00",
        tel: "12345678345",
        role: "ADM" as const,
      };

      userRepository.findByEmail.mockResolvedValue(
        User.fromDatabase({
          name: "teste123",
          email: "teste@g.com",
          password: "teste1234",
          cpf: "123.456.789-00",
          tel: "12345678345",
          role: "ADM" as const,
        }),
      );

      await expect(userService.createAdm(mockAdmData)).rejects.toThrow(
        new AppError("Email já cadastrado", 409),
      );
    });

    it("should not create a userADM if the cpf is already registered", async () => {
      const mockAdmData = {
        name: "teste123",
        email: "teste@g.com",
        password: "teste1234",
        cpf: "123.456.789-00",
        tel: "12345678345",
        role: "ADM" as const,
      };

      userRepository.findByEmail.mockResolvedValue(null),
        userRepository.findByCpf.mockResolvedValue(
          User.fromDatabase({
            name: "teste123",
            email: "teste@g.com",
            password: "teste1234",
            cpf: "123.456.789-00",
            tel: "12345678345",
            role: "ADM" as const,
          }),
        );

      await expect(userService.createAdm(mockAdmData)).rejects.toThrow(
        new AppError("CPF já cadastrado", 409),
      );
    });
  });

  describe("create User Instructor", () => {
    it("should create a new user instructor", async () => {
      const mockUserData = {
        name: "instrutor123",
        email: "instrutor@g.com",
        password: "instrutor1234",
        cpf: "123.456.789-99",
        tel: "987654321",
        role: "USER" as const,
        adm_id: 1,
        cref: "CREF-12345",
        daysofweek: [1, 2, 3],
        turntime: 1,
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(null);
      userRepository.findAdmById.mockResolvedValue(
        User.fromDatabase({
          id: 1,
          name: "adm",
          email: "adm@g.com",
          password: "adm123",
          cpf: "123.456.789-00",
          tel: "123456789",
          role: "ADM",
        }),
      );
      userRepository.findUserByCref.mockResolvedValue(null);
      userRepository.createUser.mockResolvedValue(
        User.fromDatabase({
          id: 2,
          ...mockUserData,
        }),
      );

      const result = await userService.createUser(mockUserData);

      expect(result).toMatchObject({
        id: 2,
        name: mockUserData.name,
        email: mockUserData.email,
        cpf: mockUserData.cpf,
        tel: mockUserData.tel,
        role: mockUserData.role,
      });

      expect(cargoHorariaService.create).toHaveBeenCalledWith(
        result.id,
        mockUserData.turntime,
        mockUserData.daysofweek,
      );
    });

    it("should not create a user if email is already registered", async () => {
      const mockUserData = {
        name: "instrutor123",
        email: "instrutor@g.com",
        password: "instrutor1234",
        cpf: "123.456.789-99",
        tel: "987654321",
        role: "USER" as const,
        adm_id: 1,
      };

      userRepository.findByEmail.mockResolvedValue(
        User.fromDatabase({
          id: 2,
          ...mockUserData,
        }),
      );

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        new AppError("Email já cadastrado", 409),
      );
    });

    it("should not create a user if CPF is already registered", async () => {
      const mockUserData = {
        name: "instrutor123",
        email: "instrutor@g.com",
        password: "instrutor1234",
        cpf: "123.456.789-99",
        tel: "987654321",
        role: "USER" as const,
        adm_id: 1,
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(
        User.fromDatabase({
          id: 2,
          ...mockUserData,
        }),
      );

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        new AppError("CPF já cadastrado", 409),
      );
    });

    it("should not create a user if ADM is not valid", async () => {
      const mockUserData = {
        name: "instrutor123",
        email: "instrutor@g.com",
        password: "instrutor1234",
        cpf: "123.456.789-99",
        tel: "987654321",
        role: "USER" as const,
        adm_id: 1,
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(null);
      userRepository.findAdmById.mockResolvedValue(null);

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        new AppError("Usuário não autorizado", 401),
      );
    });

    it("should not create a user if CREF is already registered", async () => {
      const mockUserData = {
        name: "instrutor123",
        email: "instrutor@g.com",
        password: "instrutor1234",
        cpf: "123.456.789-99",
        tel: "987654321",
        role: "USER" as const,
        adm_id: 1,
        cref: "CREF-12345",
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(null);
      userRepository.findAdmById.mockResolvedValue(
        User.fromDatabase({
          id: 1,
          name: "adm",
          email: "adm@g.com",
          password: "adm123",
          cpf: "123.456.789-00",
          tel: "123456789",
          role: "ADM",
        }),
      );
      userRepository.findUserByCref.mockResolvedValue(
        User.fromDatabase({
          id: 2,
          ...mockUserData,
        }),
      );

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        new AppError("CREF já cadastrado", 409),
      );
    });
  });

  describe("login", () => {
    it("should authenticate a user with valid credentials", async () => {
      const mockUser = User.fromDatabase({
        id: 1,
        adm_id: null,
        name: "teste",
        email: "teste@g.com",
        password: await hash("password123", 8),
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "USER",
      });

      userRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await userService.login("teste@g.com", "password123");

      expect(result).toHaveProperty("token");
      expect(result.serializedUser).toMatchObject({
        id: 1,
        name: "teste",
        email: "teste@g.com",
      });
    });

    it("should not authenticate if email is not registered", async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(
        userService.login("teste@g.com", "password123"),
      ).rejects.toThrow(new AppError("Credenciais inválidas", 401));
    });

    it("should not authenticate if password is invalid", async () => {
      const mockUser = User.fromDatabase({
        id: 1,
        adm_id: null,
        name: "teste",
        email: "teste@g.com",
        password: await hash("password123", 8),
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "USER",
      });

      userRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        userService.login("teste@g.com", "wrongpassword"),
      ).rejects.toThrow(new AppError("Credenciais inválidas", 401));
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const mockUser = User.fromDatabase({
        id: 1,
        adm_id: 1,
        name: "Old Name",
        email: "old@g.com",
        password: await hash("oldpassword", 8),
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "USER",
      });

      const updateData = {
        name: "New Name",
        email: "new@g.com",
        password: "newpassword",
        cpf: "123.456.789-11",
        tel: "987654321",
        role: "USER" as const,
      };

      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(null);
      userRepository.update.mockResolvedValue(
        User.fromDatabase({ ...mockUser, ...updateData }),
      );

      const result = await userService.updateUser(1, 1, updateData);

      expect(result).toMatchObject({
        id: 1,
        name: updateData.name,
        email: updateData.email,
        cpf: updateData.cpf,
        tel: updateData.tel,
      });

      expect(userRepository.update).toHaveBeenCalledWith(1, {
        ...updateData,
        password: expect.any(String), // A senha será hasheada
      });
    });

    it("should not update if user is not found", async () => {
      userRepository.findUserById.mockResolvedValue(null);
      userRepository.findAdmById.mockResolvedValue(null);

      await expect(
        userService.updateUser(1, 1, { name: "New Name", email: "new@g.com" }),
      ).rejects.toThrow(new AppError("Usuário não encontrado", 404));
    });

    it("should not update if email is already registered", async () => {
      const mockUser = User.fromDatabase({
        id: 1,
        adm_id: 1,
        name: "Old Name",
        email: "old@g.com",
        password: await hash("oldpassword", 8),
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "USER",
      });

      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.findByEmail.mockResolvedValue(
        User.fromDatabase({
          id: 2,
          name: "Another User",
          email: "new@g.com",
          password: "hashedpassword",
          cpf: "123.456.789-11",
          tel: "987654321",
          role: "USER",
        }),
      );

      await expect(
        userService.updateUser(1, 1, { name: "New Name", email: "new@g.com" }),
      ).rejects.toThrow(new AppError("Email já cadastrado", 409));
    });

    it("should not update if CPF is already registered", async () => {
      const mockUser = User.fromDatabase({
        id: 1,
        adm_id: 1,
        name: "Old Name",
        email: "old@g.com",
        password: await hash("oldpassword", 8),
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "USER",
      });

      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(
        User.fromDatabase({
          id: 2,
          name: "Another User",
          email: "another@g.com",
          password: "hashedpassword",
          cpf: "123.456.789-11",
          tel: "987654321",
          role: "USER",
        }),
      );

      await expect(
        userService.updateUser(1, 1, {
          name: "New Name",
          cpf: "123.456.789-11",
        }),
      ).rejects.toThrow(new AppError("CPF já cadastrado", 409));
    });

    it("should not update if role is different", async () => {
      const mockUser = User.fromDatabase({
        id: 1,
        adm_id: 1,
        name: "Old Name",
        email: "old@g.com",
        password: "hashedpassword",
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "USER",
      });

      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.findByCpf.mockResolvedValue(null);

      await expect(
        userService.updateUser(1, 1, { name: "New Name", role: "ADM" }),
      ).rejects.toThrow(new AppError("Role não pode ser alterada", 400));
    });
  });
  describe("getAllUsers", () => {
    it("should return all users for an ADM", async () => {
      const mockAdm = User.fromDatabase({
        id: 1,
        name: "adm",
        email: "adm@g.com",
        password: "hashedpassword",
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "ADM",
      });

      const mockUsers = [
        User.fromDatabase({
          id: 2,
          adm_id: 1,
          name: "User1",
          email: "user1@g.com",
          password: "hashedpassword",
          cpf: "123.456.789-01",
          tel: "987654321",
          role: "USER",
        }),
      ];

      userRepository.findAdmById.mockResolvedValue(mockAdm);
      userRepository.getAllUsers.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers(1, 1, 1);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        name: "User1",
        email: "user1@g.com",
      });
    });

    it("should not allow if ADM is not valid", async () => {
      userRepository.findAdmById.mockResolvedValue(null);

      await expect(userService.getAllUsers(1, 1, 1)).rejects.toThrow(
        new AppError("Usuário não autorizado", 401),
      );
    });
  });
  describe("delete", () => {
    it("should delete a user", async () => {
      const mockAdm = User.fromDatabase({
        id: 1,
        name: "adm",
        email: "adm@g.com",
        password: "hashedpassword",
        cpf: "123.456.789-00",
        tel: "123456789",
        role: "ADM",
      });

      const mockUser = User.fromDatabase({
        id: 2,
        adm_id: 1,
        name: "User1",
        email: "user1@g.com",
        password: "hashedpassword",
        cpf: "123.456.789-01",
        tel: "987654321",
        role: "USER",
      });

      userRepository.findAdmById.mockResolvedValue(mockAdm);
      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.delete.mockResolvedValue();

      await userService.delete(2, 1);

      expect(userRepository.delete).toHaveBeenCalledWith(2, 1);
    });

    it("should not allow if ADM is not valid", async () => {
      userRepository.findAdmById.mockResolvedValue(null);

      await expect(userService.delete(2, 1)).rejects.toThrow(
        new AppError("Usuário não autorizado", 401),
      );
    });

    it("should not allow if user is not found", async () => {
      userRepository.findAdmById.mockResolvedValue(
        User.fromDatabase({
          id: 1,
          name: "adm",
          email: "adm@g.com",
          password: "hashedpassword",
          cpf: "123.456.789-00",
          tel: "123456789",
          role: "ADM",
        }),
      );
      userRepository.findUserById.mockResolvedValue(null);

      await expect(userService.delete(2, 1)).rejects.toThrow(
        new AppError("Usuário não encontrado", 404),
      );
    });
  });
});
