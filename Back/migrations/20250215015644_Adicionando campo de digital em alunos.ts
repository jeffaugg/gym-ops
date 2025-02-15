import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE alunos
        ADD COLUMN fmd BYTEA;
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
        ALTER TABLE alunos
        DROP COLUMN fmd;
    `);
}
