import { Sequelize, Options } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env': '.env.test'
});
// Defina uma interface para as configurações do banco de dados
interface DatabaseConfig extends Options {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql' | 'sqlite' | 'postgres' | 'mssql'; 
}

let databaseConfig: DatabaseConfig = new Object() as DatabaseConfig;

console.log('enviroment: ', process.env.NODE_ENV);

let dialect = process.env.DB_DIALECT as 'mysql' | 'sqlite' | 'postgres' | 'mssql' || 'sqlite';

if(process.env.NODE_ENV === 'production') {
  databaseConfig = {
    username: process.env.DB_USERNAME || 'seu_username',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_DATABASE || 'sua_base_de_dados',
    host: process.env.DB_HOST || 'localhost',
    dialect: dialect, 
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    logging: false
  };
}else {
  databaseConfig = {
    username: process.env.DB_USERNAME || 'seu_username',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_DATABASE || 'sua_base_de_dados',
    host: process.env.DB_HOST || 'localhost',
    dialect: dialect, 
    storage: './__base__/database.sqlite',
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    logging: false
  };
}
const sequelize = new Sequelize(databaseConfig as DatabaseConfig);

// Teste a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Chame a função de teste de conexão
testConnection();

export default {
  original: sequelize
};
