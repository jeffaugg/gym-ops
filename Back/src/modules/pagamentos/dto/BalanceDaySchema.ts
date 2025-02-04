import { z } from "zod";

export const BalanceDaySchema = z.object({
  payment_day: z.string(),
  total_price: z.number(),
});
