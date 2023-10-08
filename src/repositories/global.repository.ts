import { RepositoryUtil } from "../utils/repository.util";
import { FindOptions, Model, QueryTypes,  } from "sequelize";

export class GlobalRepository<T extends Model> {
    private repositoryUtil: RepositoryUtil<T>;

    constructor(model: any) {
        this.repositoryUtil = new RepositoryUtil<T>(model);
    }

    async getDataByParameters(whereCondition: FindOptions, isReplica?: boolean ): Promise<T[]> {
        try {
            const results = await this.repositoryUtil.getRecordsByParameters(whereCondition, isReplica);
            return results as T[];
        } catch (error) {
            throw error;
        }
    }

    async updateData(data: any, id: number, isReplica?: boolean ): Promise<T> {
        try {
            const result = await this.repositoryUtil.updateRecord(data, id, isReplica);
            return result as T;
        } catch (error) {
            throw error;
        }
    }

    async createData(data: Partial<T>, isReplica?: boolean ): Promise<T> {
        try {
            const results = await this.repositoryUtil.createRecord(data, isReplica);
            return results as T;
        } catch (error) {
            throw error;
        }
    }

    async deleteData(id: number, isReplica?: boolean ): Promise<{ message: string }> {
        try {
            const results = await this.repositoryUtil.deleteRecord(id, isReplica);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async executeQuery(query: string, typeQuery: QueryTypes,isReplica?: boolean ): Promise<any> {
        try {
            const results = await this.repositoryUtil.executeQuery(query, typeQuery, isReplica );
            return results;
        } catch (error) {
            throw error;
        }
    }
}