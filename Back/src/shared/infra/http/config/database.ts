import knex, { Knex } from "knex";
import config from "../../../../../knexfile";
import { container } from "tsyringe";
class Database {
  private static instance: Knex;

  private constructor() {}

  public static getInstance(): Knex {
    if (!Database.instance) {
      Database.instance = knex(config.development);
    }
    return Database.instance;
  }
}
container.registerInstance<Knex>("Database", Database.getInstance());

export default Database.getInstance();
