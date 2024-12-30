import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE alunos DROP CONSTRAINT alunos_email_key`);
  await knex.raw(`ALTER TABLE alunos DROP CONSTRAINT alunos_cpf_key`);
  await knex.raw(
    `ALTER TABLE alunos ADD CONSTRAINT unique_email_adm UNIQUE (email, adm_id)`,
  );
  await knex.raw(
    `ALTER TABLE alunos ADD CONSTRAINT unique_cpf_adm UNIQUE (cpf, adm_id)`,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE alunos DROP CONSTRAINT unique_cpf_adm`);
  await knex.raw(`ALTER TABLE alunos DROP CONSTRAINT unique_email_adm`);
  await knex.raw(
    `ALTER TABLE alunos ADD CONSTRAINT alunos_cpf_key UNIQUE (cpf)`,
  );
  await knex.raw(
    `ALTER TABLE alunos ADD CONSTRAINT alunos_email_key UNIQUE (email)`,
  );
}
