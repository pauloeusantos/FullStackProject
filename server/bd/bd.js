import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('dbase', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
})

try {
    await sequelize.authenticate()
    console.log("Conectado com sucesso")
} catch(erro) {
    console.error("Nao foi possivel conectar", erro)
}

export default sequelize