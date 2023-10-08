import { ValidationChain } from "express-validator";
import { RepositoryDTO } from "../dtos/repository.dto";
import { ICrudFactory } from "../interfaces/ICrudFactory";
import { ValidatorUtil } from "../utils/validator.util";
import { body, param, query } from 'express-validator';
import { GlobalRepository } from "../repositories/global.repository";

export abstract class CrudFactory implements ICrudFactory {
    validatorFieldsNotEmpty(requiredFields: Array<string>, bodyType: string) {
        const validationRequiredFields: ValidationChain[] = [];

        for (const field of requiredFields) {
            const fieldValidations: ValidationChain[] = this.fieldNotEmpty(field, bodyType);
            validationRequiredFields.push(...fieldValidations);
        }

        return ValidatorUtil.validateFields(validationRequiredFields);
    }

    fieldNotEmpty(field: string, bodyType: string): ValidationChain[] {
        const fieldFormatted = field.replace(/([A-Z])/g, ' $1').trim();
        let methodValidator = null;

        switch (bodyType) {
            case 'body':
                methodValidator = body(fieldFormatted).notEmpty().withMessage(`${fieldFormatted} cannot be empty`);
                break;
            case 'query':
                methodValidator = query(fieldFormatted).notEmpty().withMessage(`${fieldFormatted} cannot be empty`);
                break;
            case 'param':
                methodValidator = param(fieldFormatted).notEmpty().withMessage(`${fieldFormatted} cannot be empty`);
                break;
            default:
                break;
        }

        return methodValidator ? [methodValidator] : [];
    }

    createModel(bodyData: any, Model: any) {

    }

    getRepositoryMethods(repositoryDTO: RepositoryDTO) {
        const globalRepository = new GlobalRepository(repositoryDTO.entity);
        const respositoryMethod = {
            GET: async () => await globalRepository.getDataByParameters(repositoryDTO.whereCondition, repositoryDTO.isReplicaDatabase),
            PUT: async () => await globalRepository.updateData(repositoryDTO.data, repositoryDTO.id, repositoryDTO.isReplicaDatabase),
            POST: async () => await globalRepository.createData(repositoryDTO.data, repositoryDTO.isReplicaDatabase),
            DELETE: async () => await globalRepository.deleteData(repositoryDTO.id, repositoryDTO.isReplicaDatabase),
            QUERY: async () => await globalRepository.executeQuery(repositoryDTO.query, repositoryDTO.queryType ,repositoryDTO.isReplicaDatabase),
        };

        return respositoryMethod[repositoryDTO.method];
    }

    callDatabase(repositoryDTO: RepositoryDTO) {
        try {
            const repositoryMethod = this.getRepositoryMethods(repositoryDTO);
            return repositoryMethod();
        } catch (error) {
            throw error;
        }
    }
}