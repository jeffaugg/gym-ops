import { z } from "zod";

export const pageWeekSchema = z.object({
  page: z.coerce.number().min(1).default(0),
});
