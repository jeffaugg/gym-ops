import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE alunos (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date_of_birth DATE NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            telephone VARCHAR(50) NOT NULL,
            cpf VARCHAR(50) NOT NULL UNIQUE,
            plan_id INTEGER NOT NULL,
            FOREIGN KEY (plan_id) REFERENCES planos(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS alunos`);
}
