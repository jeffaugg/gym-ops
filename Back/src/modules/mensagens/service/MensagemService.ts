import { inject, injectable } from "tsyringe";
import { MensagemRepository } from "../repository/MensagemRepository";
import { z } from "zod";
import { MensagemSchema } from "../dto/MensagemSchema";
import UserRepository from "../../user/repositories/UserRepository";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class MensagemService {
  constructor(
    @inject(MensagemRepository)
    private mensagemRepository: MensagemRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(data: z.infer<typeof MensagemSchema>, userId: number) {
    const user = await this.userRepository.findById(userId);

    if (user.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }

    return await this.mensagemRepository.create(data, userId);
  }
}
