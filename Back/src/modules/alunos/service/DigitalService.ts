import redis from "../../../shared/infra/http/config/redis";
import { io } from "../../../shared/infra/websocket/websocketServer";

interface EstadoCadastroPendenteParams {
  aluno_id: number;
  adm_id: number;
}

export async function setEstadoCadastroPendente(
  data: EstadoCadastroPendenteParams,
) {
  const { aluno_id, adm_id } = data;
  await redis.set("cadastro_pendente", JSON.stringify({ aluno_id, adm_id }));
}

export async function getEstadoCadastroPendente(): Promise<EstadoCadastroPendenteParams> {
  const dataStr = await redis.get("cadastro_pendente");
  if (!dataStr) {
    return null;
  }
  return JSON.parse(dataStr);
}

export async function limparCadastroPendente() {
  await redis.del("cadastro_pendente");
}

export async function presencaRegistrada(aluno_id: number) {
  io.emit("presence", { message: "Aluno reconhecido!", aluno_id });
}

export async function fmdRegistrada() {
  io.emit("registered", { message: "Digital registrado" });
}
