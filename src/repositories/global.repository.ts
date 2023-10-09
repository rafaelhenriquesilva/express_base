import { ErrorUtil } from "../utils/error.util";
import { RepositoryUtil } from "../utils/repository.util";
import { FindOptions, Model, QueryTypes,  } from "sequelize";

export class GlobalRepository<T extends Model> {
    private repositoryUtil: RepositoryUtil<T>;

    constructor(model: any) {
        this.repositoryUtil = new RepositoryUtil<T>(model);
    }

    async getDataByParameters(whereCondition: any, isReplica?: boolean ): Promise<T[]> {
        return ErrorUtil.handleErrorsIfContains(this.repositoryUtil.getRecordsByParameters(whereCondition)) as Promise<T[]>;
    }

    async updateData(data: any, whereCondition: any, isReplica?: boolean ): Promise<T> {
        return ErrorUtil.handleErrorsIfContains(this.repositoryUtil.updateRecord(data, whereCondition, isReplica)) as Promise<T>;
    }

    async createData(data: Partial<T>, isReplica?: boolean ): Promise<T> {
        return ErrorUtil.handleErrorsIfContains(this.repositoryUtil.createRecord(data, isReplica)) as Promise<T>;
    }

    async deleteData(id: number, isReplica?: boolean ): Promise<{ message: string }> {
        return ErrorUtil.handleErrorsIfContains(this.repositoryUtil.deleteRecord(id, isReplica)) as Promise<{ message: string }>;
    }

    async executeQuery(query: string, typeQuery: QueryTypes,isReplica?: boolean ): Promise<any> {
        return ErrorUtil.handleErrorsIfContains(this.repositoryUtil.executeQuery(query, typeQuery, isReplica )) as Promise<any>;
    }
}