import { inject, injectable } from "tsyringe";
import { MensagemRepository } from "../repository/MensagemRepository";
import { z } from "zod";
import { MensagemSchema } from "../dto/MensagemSchema";
import UserRepository from "../../user/repositories/UserRepository";
import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { enqueueEmails } from "./EnqueueEmailsService";
import { GetEmailsByRecipientTypeService } from "./GetEmailsByRecipientTypeService";
import { getPaginationOffset } from "../../../shared/helpers/calculateOffset";

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
    const user = await this.userRepository.findAdmById(userId);

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

  async list(adm_id: number, page: number, limit: number) {
    const user = await this.userRepository.findAdmById(adm_id);

    if (user.role !== "ADM") {
      throw new AppError("Usuário não autorizado", 401);
    }

    const offset = getPaginationOffset(page, limit);
    return await this.mensagemRepository.list(adm_id, offset, limit);
  }

  async findById(id: number, adm_id: number) {
    const mensagem = await this.mensagemRepository.findById(id, adm_id);

    if (!mensagem) {
      throw new AppError("Mensagem não encontrada", 404);
    }
    return mensagem;
  }
}
