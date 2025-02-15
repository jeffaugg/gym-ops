import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { setEstadoCadastroPendente } from "../../../modules/alunos/service/DigitalService";
import { app } from "../http/app";

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
  console.log("Conexão estabelecida");

  socket.on("register fingerprint", async (data: RegisterFingerPrintData) => {
    await setEstadoCadastroPendente(data);
  });

  socket.on("disconnect", () => {
    console.log("Conexão perdida");
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor Socket.IO rodando na porta 8080");
});

export { io };
