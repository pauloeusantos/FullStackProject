const express = require('express');
const cors = require('cors');
const { sequelize } = require('./bd/bd');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/products', productRoutes); // Alterado de '/products' para '/api/products'

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
