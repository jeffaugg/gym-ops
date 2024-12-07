import knex, { Knex } from "knex";
import config from "../../../../../knexfile";
import { container } from "tsyringe";
// Inicializa o Knex com o ambiente de desenvolvimento
const db = knex(config.development);
container.registerInstance<Knex>("Database", db);

export default db;
