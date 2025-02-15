import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { setEstadoCadastroPendente } from "../../../modules/alunos/service/DigitalService";
import { app } from "./app";

dotenv.config();
interface RegisterFingerPrintData {
  aluno_id: number;
  adm_id: number;
}

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Conexão estabelecida via WebSocket");

  socket.on("register fingerprint", async (data: RegisterFingerPrintData) => {
    await setEstadoCadastroPendente(data);
  });

  socket.on("disconnect", () => {
    console.log("Conexão via WebSocket encerrada");
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`WebSocket rodando na porta ${PORT}`);
});

export { io };
