import { inject, injectable } from "tsyringe";
import UserRepository from "../repositories/UserRepository";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { UserSchema } from "../dto/UserSchema";
import { hash } from "bcryptjs";
import { SerializeUser } from "../../../shared/infra/http/helpers/SerializeUser";
import { createAccessToken } from "../../../shared/infra/http/helpers/CreateTokens";
import { CargoHorariaService } from "../../cargoHoraria/service/CargoHorariaService";
import { UpdateUserSchema } from "../dto/UpdateUserSchema";
import { getPaginationOffset } from "../../../shared/helpers/calculateOffset";

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository)
    private userRepository: UserRepository,
    @inject(CargoHorariaService)
    private cargoHorariaService: CargoHorariaService,
  ) {}

  async createAdm(data: z.infer<typeof UserSchema>) {
    const userByEmail = await this.userRepository.findByEmail(data.email);

    if (userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    const userByCpf = await this.userRepository.findByCpf(data.cpf);

    if (userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    data.password = await hash(data.password, 8);
    return this.userRepository.createAdm(data);
  }

  async createUser(data: z.infer<typeof UserSchema> & { adm_id: number }) {
    const userByEmail = await this.userRepository.findByEmail(data.email);

    if (userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    const userByCpf = await this.userRepository.findByCpf(data.cpf);

    if (userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    const adm = await this.userRepository.findAdmById(data.adm_id);

    if (!adm || adm.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }

    const userByCref = await this.userRepository.findUserByCref(
      data.cref,
      data.adm_id,
    );

    if (userByCref) {
      throw new AppError("CREF já cadastrado", 409);
    }

    data.password = await hash(data.password, 8);

    const newUser = await this.userRepository.createUser(data);

    await this.cargoHorariaService.create(
      newUser.id,
      data.turntime,
      data.daysofweek,
    );

    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const serializedUser = await SerializeUser(user);
    const token = createAccessToken(user);
    return {
      serializedUser,
      token,
    };
  }

  async findUserById(id: number, adm_id: number) {
    const user = await this.userRepository.findUserById(id, adm_id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user;
  }

  async updateUser(
    id: number,
    adm_id: number,
    data: z.infer<typeof UpdateUserSchema>,
  ) {
    let user = await this.userRepository.findUserById(id, adm_id);
    if (!user) {
      user = await this.userRepository.findAdmById(id);
    }

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const userByEmail = await this.userRepository.findByEmail(data.email);

    if (userByEmail && userByEmail.id !== id) {
      throw new AppError("Email já cadastrado", 409);
    }

    const userByCpf = await this.userRepository.findByCpf(data.cpf);

    if (userByCpf && userByCpf.id !== id) {
      throw new AppError("CPF já cadastrado", 409);
    }

    if (data.password && data.password === user.password) {
      throw new AppError("Senha não pode ser igual à anterior", 409);
    }

    if (data.role != user.role) {
      throw new AppError("Role não pode ser alterada", 400);
    }

    if (!data.password) {
      data.password = user.password;
    }
    data.password = await hash(data.password, 8);

    if (user.role === "USER") {
      await this.cargoHorariaService.update(id, data.turntime, data.daysofweek);
    }
    return await this.userRepository.update(id, data);
  }

  async getAllUsers(adm_id: number, page: number, limit: number) {
    const adm = await this.userRepository.findAdmById(adm_id);

    if (!adm || adm.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }
    const offset = getPaginationOffset(page, limit);
    return await this.userRepository.getAllUsers(adm_id, offset, limit);
  }

  async delete(id: number, adm_id: number) {
    const adm = await this.userRepository.findAdmById(adm_id);

    if (!adm || adm.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }

    const user = await this.userRepository.findUserById(id, adm_id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return await this.userRepository.delete(id, adm_id);
  }
}
