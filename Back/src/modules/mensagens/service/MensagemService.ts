import { inject, injectable } from "tsyringe";
import { MensagemRepository } from "../repository/MensagemRepository";
import { z } from "zod";
import { MensagemSchema } from "../dto/MensagemSchema";
import UserRepository from "../../user/repositories/UserRepository";
import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { enqueueEmails } from "./EnqueueEmailsService";
import { GetEmailsByRecipientTypeService } from "./GetEmailsByRecipientTypeService";

@injectable()
export class MensagemService {
  private getEmailsByRecipinetTypeService: GetEmailsByRecipientTypeService;
  constructor(
    @inject(MensagemRepository)
    private mensagemRepository: MensagemRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {
    this.getEmailsByRecipinetTypeService = new GetEmailsByRecipientTypeService(
      this.alunoRepository,
      this.userRepository,
    );
  }

  async create(data: z.infer<typeof MensagemSchema>, userId: number) {
    const user = await this.userRepository.findById(userId);

    if (user.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }

    const emails = await this.getEmailsByRecipinetTypeService.get(
      data.recipient_type,
      userId,
    );

    await enqueueEmails(emails, data.title, data.body);

    return await this.mensagemRepository.create(data, userId);
  }

  async list() {
    return await this.mensagemRepository.list();
  }

  async findById(id: number) {
    const mensagem = await this.mensagemRepository.findById(id);

    if (!mensagem) {
      throw new AppError("Mensagem não encontrada", 404);
    }
    return mensagem;
  }
}
