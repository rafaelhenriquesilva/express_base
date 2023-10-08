import {RepositoryDTO} from '../dtos/repository.dto';
export interface ICrudFactory {
    validatorFieldsNotEmpty(requiredFields: Array<string>, bodyType: string): any;
    createModel(bodyData: any, Model: any): any;
    callDatabase(repositoryDO: RepositoryDTO): any;
}

