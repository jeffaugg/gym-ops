import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DigitalSchema } from "../dto/DigitalSchema";
import { AlunoService } from "../service/AlunoService";

@injectable()
export class DigitalController {
  async fingerprintByAluno(req: Request, res: Response) {
    const validatedData = DigitalSchema.parse(req.body);
    const fmd = Buffer.from(validatedData.fmd, "base64");
    const alunoService = container.resolve(AlunoService);

    await alunoService.processFingerprint(fmd);

    return res.status(200).send();
  }
}
