import { app } from "./app";
import { db } from "./app";
require('dotenv').config();



app.listen(process.env.PORT, async () => {
    console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
    try {
        await db.raw(`
            INSERT INTO users (name, email, password, tel, role)
            VALUES (?, ?, ?, ?, ?)
          `, ["nome", "email", "senha", "40028922", "instrutor"]);
    
        console.log('Usuário inseridos com sucesso!');
      } catch (error) {
        console.error('Erro ao inserir usuários:', error);
      }
});
