import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DigitalSchema } from "../dto/DigitalSchema";
import { AlunoService } from "../service/AlunoService";

@injectable()
export class DigitalController {
  async fingerprintByAluno(req: Request, res: Response) {
    const data = {
      ...req.body,
      fmd: Buffer.from(req.body.fmd, "base64"),
    };
    const validatedData = DigitalSchema.parse(data);

    const alunoService = container.resolve(AlunoService);

    await alunoService.processFingerprint(validatedData.fmd);

    return res.status(200).send();
  }
}
