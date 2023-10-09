const dotenv = require('dotenv');
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
module.exports = {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST, // Substitua pelo host do seu banco de dados
    username: process.env.DB_USERNAME, // Substitua pelo seu nome de usuário
    password: process.env.DB_PASSWORD, // Substitua pela sua senha
    database: process.env.DB_DATABASE,
    storage: './__base__/database.sqlite',
    operatorAliases : false,
    logging: true,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
}