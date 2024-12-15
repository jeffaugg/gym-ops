import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE planos
        ADD COLUMN spots INT;
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE planos DROP COLUMN spots;`);
}
