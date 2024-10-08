const express = require('express');
const cors = require('cors');
const { sequelize } = require('./bd/bd');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes); 


sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
