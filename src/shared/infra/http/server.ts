import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

app.listen(process.env.PORT, async () => {
  console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
});
