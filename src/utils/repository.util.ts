

import { Model, Sequelize, QueryTypes } from 'sequelize';
import sequelize from '../config/sequelize';


export class RepositoryUtil<T extends Model> {
    model: any;

    constructor(model?:any) {
        this.model = model;
    }

    async getConnection(isReplica?: boolean) {
        try {
            let connection = sequelize.original;
            /**
             * Funcionalidade para quando usar um banco para leitura e outro para escrita
             */
            // if (isReplica) {
            //     connection = sequelize.replica
            // }
            return connection;
        } catch (error: any) {
            console.error(`Error to connect to database: ${error.message}`);
            throw new Error(`Error to connect to database: ${error.message}`);
        }
    }

    async executeQuery(query: string, typeQuery: QueryTypes = QueryTypes.SELECT, isReplica?: boolean) {
        try {
            const connection = await this.getConnection(isReplica);
            const records = await connection.query(query, { type: typeQuery });
            return records;
        } catch (error: any) {
            console.error(`Error to execute query: ${error.message}`);
            throw new Error(`Error to execute query: ${error.message}`);
        }
    }

    async getRecordsByParameters(whereCondition: any,  isReplica?: boolean) {
        try {
            const connection = await this.getConnection(isReplica);
            const records = connection.models[this.model.name].findAll({ where: whereCondition });
            return records;
        } catch (error: any) {
            console.error(`Error to get records: ${error.message}`);
            throw new Error(`Error to get records: ${error.message}`);
        }
    }

    async updateRecord(record: any, whereCondition: any,  isReplica?: boolean) {
        try {
            const connection = await this.getConnection(isReplica);
            const updatedRecord = await connection.models[this.model.name].update(record, { 
                where: whereCondition,
                returning: true,
              });
            if (updatedRecord[0] === 0) {
                throw new Error(`Record with id ${whereCondition.id} not found.`);

            }
            let result = await this.getRecordsByParameters(whereCondition, isReplica);
           
            return result;
          } catch (error: any) {
            console.error(`Error to update record: ${error.message}`);
            throw new Error(`Error to update record: ${error.message}`);
        }
    }

    async createRecord(record: any,  isReplica?: boolean) {
        try {
            const connection = await this.getConnection(isReplica);
            const createdRecord = await connection.models[this.model.name].create(record);
            return createdRecord;
          } catch (error: any) {
            console.error(`Error to create record: ${error.message}`);
            throw new Error(`Error to create record: ${error.message}`);
        }
    }

    async deleteRecord(id: any,  isReplica?: boolean) {
        try {
            const connection = await this.getConnection(isReplica);
            const deletedRecord = await connection.models[this.model.name].destroy({ 
                where: { id },
              });
            if (deletedRecord === 0) {
                throw new Error(`Record with id ${id} not found.`);
            }
            return { message: `Record with id ${id} deleted.` };
          } catch (error: any) {
            console.error(`Error to delete record: ${error.message}`);
            throw new Error(`Error to delete record: ${error.message}`);
        }
    }
}