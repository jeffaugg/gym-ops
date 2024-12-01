import knex from "knex";
import config from "../../../../../knexfile";
// Inicializa o Knex com o ambiente de desenvolvimento
const db = knex(config.development);

export default db;
