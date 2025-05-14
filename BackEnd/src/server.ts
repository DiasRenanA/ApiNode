import { app } from "./app";
import { config } from "dotenv";

config();

app.listen(process.env.PORT, function(){
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
});