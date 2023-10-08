import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';


dotenv.config();

let configDatabase = {
  dialect: 'mysql', 
  host: process.env.DB_HOST, 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
  define: {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
  },
  logging: false
}

const sequelize = new Sequelize(configDatabase as any);

configDatabase.host = process.env.DB_HOST_REPLICA;
const sequelizeReplica = new Sequelize(configDatabase as any);


export default {
  original: sequelize,
  replica: sequelizeReplica
};