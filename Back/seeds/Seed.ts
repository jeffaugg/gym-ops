import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
        INSERT INTO users (name, email, tel, password, role, cpf, adm_id, cref, gender, date_of_birth, status)
        VALUES (
            'Administrador',
            'admin@example.com',
            '(11) 99999-9999',
            '$2a$08$fi2MGcDyvfsLtmdnlk4C6erJ6cQG7fSpIfDxo1WVXcoGbkzdVDfDu',
            'ADMIN',
            '123.456.789-00',
            NULL,
            NULL,
            'M',
            '1985-05-20',
            true
        );
        `);

  await knex.raw(`
     INSERT INTO planos (name, price, duration, spots, adm_id)
      VALUES 
          ('Plano Básico', 49.90, 30, 50, 1),
          ('Plano Padrão', 79.90, 60, 40, 1),
          ('Plano Premium', 99.90, 90, 30, 1),
          ('Plano Semestral', 499.90, 180, 20, 1),
          ('Plano Anual', 899.90, 365, 10, 1);
`);

  await knex.raw(`
  INSERT INTO alunos (name, date_of_birth, email, telephone, cpf, plan_id, created_at, health_notes, status, gender, adm_id)
  VALUES 
      ('João Silva', '1995-03-10', 'joao.silva@example.com', '(11) 98888-1111', '123.456.789-01', 1, NOW(), 'Sem restrições', true, 'M', 1),
      ('Maria Oliveira', '1998-06-22', 'maria.oliveira@example.com', '(11) 98888-2222', '123.456.789-02', 2, NOW(), 'Histórico de lesão no joelho', true, 'F', 1),
      ('Carlos Santos', '1992-09-14', 'carlos.santos@example.com', '(11) 98888-3333', '123.456.789-03', 3, NOW(), 'Alergia a látex', true, 'M', 1),
      ('Ana Costa', '2000-01-05', 'ana.costa@example.com', '(11) 98888-4444', '123.456.789-04', 1, NOW(), NULL, true, 'F', 1),
      ('Lucas Pereira', '1996-07-19', 'lucas.pereira@example.com', '(11) 98888-5555', '123.456.789-05', 2, NOW(), 'Hipertensão controlada', true, 'M', 1),
      ('Juliana Lima', '1999-11-30', 'juliana.lima@example.com', '(11) 98888-6666', '123.456.789-06', 3, NOW(), NULL, true, 'F', 1),
      ('Gabriel Almeida', '1994-05-08', 'gabriel.almeida@example.com', '(11) 98888-7777', '123.456.789-07', 4, NOW(), 'Diabetes Tipo 1', true, 'M', 1),
      ('Fernanda Rocha', '1997-12-25', 'fernanda.rocha@example.com', '(11) 98888-8888', '123.456.789-08', 5, NOW(), NULL, true, 'F', 1),
      ('Rafael Martins', '1993-08-16', 'rafael.martins@example.com', '(11) 98888-9999', '123.456.789-09', 1, NOW(), 'Sem restrições', true, 'M', 1),
      ('Camila Mendes', '2001-04-02', 'camila.mendes@example.com', '(11) 98888-0000', '123.456.789-10', 2, NOW(), NULL, true, 'F', 1)
  `);

  await knex.raw(`
  INSERT INTO pagamentos (id_aluno, id_plano, status, payment, payment_date, expiration_date, user_id)
  VALUES 
      -- João Silva (6 pagamentos)
      (1, 1, true, 'Cartão', NOW() - INTERVAL '180 days', NOW() - INTERVAL '150 days', 1),
      (1, 1, true, 'PIX', NOW() - INTERVAL '150 days', NOW() - INTERVAL '120 days', 1),
      (1, 1, true, 'Boleto', NOW() - INTERVAL '120 days', NOW() - INTERVAL '90 days', 1),
      (1, 1, false, 'PIX', NOW() - INTERVAL '90 days', NOW() - INTERVAL '60 days', 1),
      (1, 1, true, 'Cartão', NOW() - INTERVAL '60 days', NOW() - INTERVAL '30 days', 1),
      (1, 1, false, 'Boleto', NOW() - INTERVAL '30 days', NOW(), 1),

      -- Maria Oliveira (5 pagamentos)
      (2, 2, true, 'Boleto', NOW() - INTERVAL '160 days', NOW() - INTERVAL '130 days', 1),
      (2, 2, true, 'PIX', NOW() - INTERVAL '130 days', NOW() - INTERVAL '100 days', 1),
      (2, 2, false, 'Cartão', NOW() - INTERVAL '100 days', NOW() - INTERVAL '70 days', 1),
      (2, 2, true, 'PIX', NOW() - INTERVAL '70 days', NOW() - INTERVAL '40 days', 1),
      (2, 2, false, 'Boleto', NOW() - INTERVAL '40 days', NOW(), 1),

      -- Carlos Santos (4 pagamentos)
      (3, 3, true, 'Cartão', NOW() - INTERVAL '140 days', NOW() - INTERVAL '110 days', 1),
      (3, 3, false, 'PIX', NOW() - INTERVAL '110 days', NOW() - INTERVAL '80 days', 1),
      (3, 3, true, 'Boleto', NOW() - INTERVAL '80 days', NOW() - INTERVAL '50 days', 1),
      (3, 3, false, 'Cartão', NOW() - INTERVAL '50 days', NOW(), 1),

      -- Ana Costa (6 pagamentos)
      (4, 1, true, 'PIX', NOW() - INTERVAL '200 days', NOW() - INTERVAL '170 days', 1),
      (4, 1, true, 'Cartão', NOW() - INTERVAL '170 days', NOW() - INTERVAL '140 days', 1),
      (4, 1, true, 'Boleto', NOW() - INTERVAL '140 days', NOW() - INTERVAL '110 days', 1),
      (4, 1, false, 'PIX', NOW() - INTERVAL '110 days', NOW() - INTERVAL '80 days', 1),
      (4, 1, true, 'Cartão', NOW() - INTERVAL '80 days', NOW() - INTERVAL '50 days', 1),
      (4, 1, false, 'Boleto', NOW() - INTERVAL '50 days', NOW(), 1),

      -- Lucas Pereira (5 pagamentos)
      (5, 2, true, 'Boleto', NOW() - INTERVAL '180 days', NOW() - INTERVAL '150 days', 1),
      (5, 2, true, 'Cartão', NOW() - INTERVAL '150 days', NOW() - INTERVAL '120 days', 1),
      (5, 2, false, 'PIX', NOW() - INTERVAL '120 days', NOW() - INTERVAL '90 days', 1),
      (5, 2, true, 'Cartão', NOW() - INTERVAL '90 days', NOW() - INTERVAL '60 days', 1),
      (5, 2, false, 'Boleto', NOW() - INTERVAL '60 days', NOW(), 1),

      -- Juliana Lima (4 pagamentos)
      (6, 3, true, 'PIX', NOW() - INTERVAL '160 days', NOW() - INTERVAL '130 days', 1),
      (6, 3, false, 'Cartão', NOW() - INTERVAL '130 days', NOW() - INTERVAL '100 days', 1),
      (6, 3, true, 'Boleto', NOW() - INTERVAL '100 days', NOW() - INTERVAL '70 days', 1),
      (6, 3, false, 'PIX', NOW() - INTERVAL '70 days', NOW(), 1),

      -- Gabriel Almeida (6 pagamentos)
      (7, 4, true, 'Cartão', NOW() - INTERVAL '220 days', NOW() - INTERVAL '190 days', 1),
      (7, 4, true, 'PIX', NOW() - INTERVAL '190 days', NOW() - INTERVAL '160 days', 1),
      (7, 4, false, 'Boleto', NOW() - INTERVAL '160 days', NOW() - INTERVAL '130 days', 1),
      (7, 4, true, 'Cartão', NOW() - INTERVAL '130 days', NOW() - INTERVAL '100 days', 1),
      (7, 4, true, 'PIX', NOW() - INTERVAL '100 days', NOW() - INTERVAL '70 days', 1),
      (7, 4, false, 'Boleto', NOW() - INTERVAL '70 days', NOW(), 1),

      -- Fernanda Rocha (4 pagamentos)
      (8, 5, true, 'Cartão', NOW() - INTERVAL '140 days', NOW() - INTERVAL '110 days', 1),
      (8, 5, false, 'PIX', NOW() - INTERVAL '110 days', NOW() - INTERVAL '80 days', 1),
      (8, 5, true, 'Boleto', NOW() - INTERVAL '80 days', NOW() - INTERVAL '50 days', 1),
      (8, 5, false, 'Cartão', NOW() - INTERVAL '50 days', NOW(), 1),

      -- Rafael Martins (5 pagamentos)
      (9, 1, true, 'Boleto', NOW() - INTERVAL '180 days', NOW() - INTERVAL '150 days', 1),
      (9, 1, true, 'PIX', NOW() - INTERVAL '150 days', NOW() - INTERVAL '120 days', 1),
      (9, 1, false, 'Cartão', NOW() - INTERVAL '120 days', NOW() - INTERVAL '90 days', 1),
      (9, 1, true, 'PIX', NOW() - INTERVAL '90 days', NOW() - INTERVAL '60 days', 1),
      (9, 1, false, 'Boleto', NOW() - INTERVAL '60 days', NOW(), 1),

      -- Camila Mendes (6 pagamentos)
      (10, 2, true, 'Cartão', NOW() - INTERVAL '200 days', NOW() - INTERVAL '170 days', 1),
      (10, 2, true, 'PIX', NOW() - INTERVAL '170 days', NOW() - INTERVAL '140 days', 1),
      (10, 2, true, 'Boleto', NOW() - INTERVAL '140 days', NOW() - INTERVAL '110 days', 1),
      (10, 2, false, 'PIX', NOW() - INTERVAL '110 days', NOW() - INTERVAL '80 days', 1),
      (10, 2, true, 'Cartão', NOW() - INTERVAL '80 days', NOW() - INTERVAL '50 days', 1),
      (10, 2, false, 'Boleto', NOW() - INTERVAL '50 days', NOW(), 1)
  `);

  await knex.raw(`
        INSERT INTO users (name, email, tel, password, role, cpf, cref, gender, date_of_birth, status)
        VALUES ('Instrutor Exemplo', 'instrutor@example.com', '(85) 98765-4321', '$2a$08$WZlEgWruejhXwD5O85GEHe4UIKX7sranqGcJsGusR2GbvNvAHpsSO', 'INSTRUCTOR', '123.456.789-01', 'CREF123456', 'M', '1980-01-01', true);`);

  await knex.raw(`
  INSERT INTO avaliacoes (aluno_id, instructor_id, "date", height, weight, fat_mass, lean_mass, left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip)
  VALUES
      -- Avaliações para João Silva
      (1, 2, NOW() - INTERVAL '60 days', 175, 70, 15, 55, 30, 30.5, 31, 31.5, 55, 55.5, 35, 35.5, 90, 80, 85, 95),
      (1, 2, NOW() - INTERVAL '30 days', 175, 72, 14, 58, 30.5, 31, 31.5, 32, 55.5, 56, 35.5, 36, 92, 81, 86, 96),

      -- Avaliações para Maria Oliveira
      (2, 2, NOW() - INTERVAL '45 days', 160, 60, 20, 48, 28, 28.5, 29, 29.5, 50, 50.5, 32, 32.5, 85, 75, 78, 90),
      (2, 2, NOW() - INTERVAL '15 days', 160, 59, 19, 48, 28.5, 29, 29.5, 30, 50.5, 51, 32.5, 33, 86, 76, 79, 91),

      -- Avaliação para Carlos Santos
      (3, 2, NOW() - INTERVAL '20 days', 180, 80, 18, 62, 32, 32.5, 33, 33.5, 58, 58.5, 37, 37.5, 95, 85, 88, 100),

      -- Avaliações para Ana Costa
      (4, 2, NOW() - INTERVAL '50 days', 165, 65, 22, 50, 29, 29.5, 30, 30.5, 52, 52.5, 33, 33.5, 88, 78, 82, 92),
      (4, 2, NOW() - INTERVAL '10 days', 165, 64, 21, 50, 29.5, 30, 30.5, 31, 52.5, 53, 33.5, 34, 89, 79, 83, 93),

      -- Avaliação para Lucas Pereira
      (5, 2, NOW() - INTERVAL '25 days', 170, 75, 17, 58, 31, 31.5, 32, 32.5, 56, 56.5, 36, 36.5, 92, 82, 86, 97),

      -- Avaliações para Juliana Lima
      (6, 2, NOW() - INTERVAL '40 days', 158, 58, 21, 46, 27, 27.5, 28, 28.5, 49, 49.5, 31, 31.5, 84, 74, 77, 89),
      (6, 2, NOW() - INTERVAL '5 days', 158, 57, 20, 46, 27.5, 28, 28.5, 29, 49.5, 50, 31.5, 32, 85, 75, 78, 90),

      -- Avaliação para Gabriel Almeida
      (7, 2, NOW() - INTERVAL '30 days', 182, 85, 16, 69, 33, 33.5, 34, 34.5, 60, 60.5, 38, 38.5, 98, 88, 91, 102),

      -- Avaliações para Fernanda Rocha
      (8, 2, NOW() - INTERVAL '35 days', 162, 62, 19, 50, 28, 28.5, 29, 29.5, 51, 51.5, 32, 32.5, 87, 77, 80, 91),
      (8, 2, NOW() - INTERVAL '7 days', 162, 61, 18, 50, 28.5, 29, 29.5, 30, 51.5, 52, 32.5, 33, 88, 78, 81, 92),

      -- Avaliação para Rafael Martins
      (9, 2, NOW() - INTERVAL '15 days', 175, 78, 17, 61, 30, 30.5, 31, 31.5, 55, 55.5, 35, 35.5, 91, 81, 84, 96),

      -- Avaliações para Camila Mendes
      (10, 2, NOW() - INTERVAL '45 days', 168, 63, 20, 50, 29, 29.5, 30, 30.5, 53, 53.5, 34, 34.5, 89, 79, 82, 93),
      (10, 2, NOW() - INTERVAL '12 days', 168, 62, 19, 50, 29.5, 30, 30.5, 31, 53.5, 54, 34.5, 35, 90, 80, 83, 94);

  -- Inserindo Fotos para algumas Avaliações
  INSERT INTO fotos_avaliacoes (avaliacao_id, foto_path, data_upload)
  VALUES
      -- Fotos para a primeira avaliação de João Silva
      (1, 'https://br.freepik.com/fotos-gratis/homem-saudavel-correndo-ao-ar-livre_4105165.htm', NOW() - INTERVAL '60 days'),

      -- Fotos para a segunda avaliação de Maria Oliveira
      (4, 'https://br.freepik.com/fotos-gratis/mulher-fazendo-exercicio-de-alongamento_1234567.htm', NOW() - INTERVAL '15 days');
  `);

  await knex.raw(`
      INSERT INTO exercicios (name, muscles, adm_id)
      VALUES
          ('Agachamento Livre', 'Quadríceps, Glúteos, Lombar', 2),
          ('Supino Reto', 'Peitorais, Tríceps, Deltoides Anteriores', 2),
          ('Levantamento Terra', 'Dorsais, Glúteos, Isquiotibiais, Lombar', 2),
          ('Remada Curvada', 'Dorsais, Trapézio, Bíceps', 2),
          ('Desenvolvimento com Halteres', 'Deltoides, Tríceps', 2),
          ('Rosca Direta', 'Bíceps', 2),
          ('Tríceps Testa', 'Tríceps', 2),
          ('Elevação Lateral', 'Deltoides Laterais', 2),
          ('Cadeira Extensora', 'Quadríceps', 2),
          ('Mesa Flexora', 'Isquiotibiais', 2);
    `);

  await knex.raw(`
      INSERT INTO treinos (name, notes, adm_id)
      VALUES
          ('Treino A - Peito e Tríceps', 'Foco em exercícios para peitorais e tríceps.', 2),
          ('Treino B - Costas e Bíceps', 'Foco em exercícios para dorsais e bíceps.', 2),
          ('Treino C - Pernas e Ombros', 'Foco em exercícios para membros inferiores e ombros.', 2);
      `);

  await knex.raw(`
  
  -- Treino A - Peito e Tríceps
  INSERT INTO exercicios_de_treinos (treino_id, exercicio_id, repeticoes, series, descanso_segundos)
  VALUES
      (1, 2, 12, 3, 60),  -- Supino Reto
      (1, 7, 12, 3, 60),  -- Tríceps Testa
      (1, 5, 12, 3, 60);  -- Desenvolvimento com Halteres

  -- Treino B - Costas e Bíceps
  INSERT INTO exercicios_de_treinos (treino_id, exercicio_id, repeticoes, series, descanso_segundos)
  VALUES
      (2, 4, 12, 3, 60),  -- Remada Curvada
      (2, 6, 12, 3, 60),  -- Rosca Direta
      (2, 3, 12, 3, 60);  -- Levantamento Terra

  -- Treino C - Pernas e Ombros
  INSERT INTO exercicios_de_treinos (treino_id, exercicio_id, repeticoes, series, descanso_segundos)
  VALUES
      (3, 1, 12, 3, 60),  -- Agachamento Livre
      (3, 9, 12, 3, 60),  -- Cadeira Extensora
      (3, 10, 12, 3, 60), -- Mesa Flexora
      (3, 8, 12, 3, 60);  -- Elevação Lateral
`);

  await knex.raw(`
  INSERT INTO treinos_de_alunos (aluno_id, treino_id)
  VALUES
      (1, 1),
      (2, 2),
      (3, 3),
      (4, 1),
      (5, 2),
      (6, 3),
      (7, 1),
      (8, 2),
      (9, 3),
      (10, 1),
      (1, 2),  
      (2, 3),  
      (3, 1),  
      (4, 2),  
      (5, 3);
`);

  await knex.raw(`
  INSERT INTO mensagens (id_adm, title, body, recipient_type, created_at)
  VALUES
      (1, 'Bem-vindo à nossa Academia!', 'Olá, [Nome do Aluno]! É com grande alegria que o recebemos em nossa comunidade fitness. Estamos aqui para apoiar você em cada passo rumo aos seus objetivos de saúde e bem-estar. Conte conosco!', 'STUDENTS', NOW()),
      
      (1, 'Novidades em Nossos Treinos', 'Prezado aluno, temos o prazer de informar que adicionamos novas modalidades de treino em nossa grade horária. Confira nossos horários atualizados e venha experimentar!', 'ALL', NOW()),
      
      (1, 'Dica da Semana: Alimentação Saudável', 'Manter uma alimentação equilibrada é fundamental para potencializar os resultados dos seus treinos. Inclua frutas, verduras e proteínas magras em suas refeições. Seu corpo agradece!', 'STUDENTS', NOW()),
      
      (1, 'Parabéns pelo Seu Desempenho!', 'Estamos impressionados com sua dedicação e progresso nos treinos. Continue assim e alcance resultados ainda mais incríveis!', 'STUDENTS', NOW()),
      
      (1, 'Lembrete: Avaliação Física', 'Lembre-se de agendar sua avaliação física semestral. É importante para acompanhar sua evolução e ajustar seu plano de treino conforme necessário.', 'STUDENTS', NOW());
  `);

  await knex.raw(`
    INSERT INTO cargo_horaria (dia_id, horario_id, user_id)
    SELECT d.id AS dia_id, h.id AS horario_id, 2 AS user_id
    FROM dias d
    CROSS JOIN horarios h;
   `);
}
