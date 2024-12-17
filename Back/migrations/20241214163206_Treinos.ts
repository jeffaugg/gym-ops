import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE treinos (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            notes TEXT
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS treinos`);
}
