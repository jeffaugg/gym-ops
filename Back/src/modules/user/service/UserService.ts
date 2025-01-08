import { inject, injectable } from "tsyringe";
import UserRepository from "../repositories/UserRepository";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { UserSchema } from "../dto/UserSchema";
import { hash } from "bcryptjs";
import { SerializeUser } from "../../../shared/infra/http/helpers/SerializeUser";
import { createAccessToken } from "../../../shared/infra/http/helpers/CreateTokens";

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository)
    private userRepository: UserRepository,
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

    const adm = await this.userRepository.findById(data.adm_id);

    if (!adm || adm.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }

    data.password = await hash(data.password, 8);
    return this.userRepository.createUser(data);
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

  async update(id: number, data: z.infer<typeof UserSchema>) {
    const user = await this.userRepository.findById(id);

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

    data.password = await hash(data.password, 8);

    return this.userRepository.update(id, data);
  }
}
