import { app } from "./app";
require('dotenv').config();



app.listen(process.env.PORT, async () => {
    console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
    
});
