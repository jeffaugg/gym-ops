import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw("ALTER TABLE planos RENAME COLUMN duration TO duration_old;");

  await knex.raw("ALTER TABLE planos ADD COLUMN duration INTEGER;");

  await knex.raw("UPDATE planos SET duration = CAST(duration_old AS INTEGER);");

  await knex.raw("ALTER TABLE planos DROP COLUMN duration_old;");
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw("ALTER TABLE planos RENAME COLUMN duration TO duration_old;");

  await knex.raw("ALTER TABLE planos ADD COLUMN duration VARCHAR(50);");
  await knex.raw(
    "UPDATE planos SET duration = CAST(duration_old AS VARCHAR(50));",
  );

  await knex.raw("ALTER TABLE planos DROP COLUMN duration_old;");
}
