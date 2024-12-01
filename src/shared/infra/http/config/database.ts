
const knex = require('knex');
const config = require('../../../../../knexfile'); // Certifique-se de usar o caminho correto para o knexfile.js

// Inicializa o Knex com o ambiente de desenvolvimento
const db = knex(config.development);

export default db

