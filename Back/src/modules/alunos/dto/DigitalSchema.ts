import { z } from "zod";

export const DigitalSchema = z.object({
  fmd: z.instanceof(Buffer),
});
