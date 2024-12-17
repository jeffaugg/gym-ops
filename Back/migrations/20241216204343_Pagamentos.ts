import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE pagamentos (
            id SERIAL PRIMARY KEY,
            id_aluno INTEGER NOT NULL,
            id_plano INTEGER NOT NULL,
            status BOOLEAN NOT NULL,
            payment VARCHAR(50) NOT NULL,
            payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expiration_date TIMESTAMP NOT NULL,
            FOREIGN KEY (id_aluno) REFERENCES alunos(id) ON DELETE CASCADE,
            FOREIGN KEY (id_plano) REFERENCES planos(id) ON DELETE CASCADE
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS pagamentos`);
}
