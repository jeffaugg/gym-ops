import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, async () => {
  console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
});
