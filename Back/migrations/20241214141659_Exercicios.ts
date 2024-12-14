import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE exercicios (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            muscles TEXT NOT NULL
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS exercicios`);
}
