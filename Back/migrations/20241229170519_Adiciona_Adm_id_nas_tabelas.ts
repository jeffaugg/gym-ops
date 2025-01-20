import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
            ALTER TABLE users
            ADD COLUMN adm_id INT;
        `);

  await knex.raw(`
            ALTER TABLE planos
            ADD COLUMN adm_id INT
            REFERENCES users(id);
            `);
  await knex.raw(`
            ALTER TABLE exercicios
            ADD COLUMN adm_id INT
            REFERENCES users(id);
            `);

  await knex.raw(`
            ALTER TABLE treinos
            ADD COLUMN adm_id INT
            REFERENCES users(id);
            `);

  await knex.raw(`
              ALTER TABLE alunos
              ADD COLUMN adm_id INT
              REFERENCES users(id);
              `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE users DROP COLUMN adm_id;`);
  await knex.raw(`ALTER TABLE planos DROP COLUMN adm_id;`);
  await knex.raw(`ALTER TABLE exercicios DROP COLUMN adm_id;`);
  await knex.raw(`ALTER TABLE treinos DROP COLUMN adm_id;`);
  await knex.raw(`ALTER TABLE alunos DROP COLUMN adm_id;`);
}
