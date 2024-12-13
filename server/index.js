import express from "express";
import cors from "cors";
import { sequelize } from "./bd/bd.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3001;

console.log("Index file loaded successfully.");

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes); 

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
