import { RepositoryDTO } from "../../dtos/repository.dto";
import UserAuthentication from "../../entities/UserAuthentication";
import { CrudFactory } from "../../factories/CrudFactory";

class CrudFactoryMock extends CrudFactory {
    constructor() {
        super();
    }
}

CrudFactoryMock.prototype.createModel = jest.fn();
CrudFactoryMock.prototype.getRepositoryMethods = jest.fn();
CrudFactoryMock.prototype.callDatabase = jest.fn();


describe('CrudFactory', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('validator fields not empty type body', async () => {
        let requiredFields = ['username', 'password'];
        let bodyType = 'body';
        let crudFactory = new CrudFactoryMock();
        let validatorFieldsNotEmpty = crudFactory.validatorFieldsNotEmpty(requiredFields, bodyType);
        
        expect(validatorFieldsNotEmpty).not.toBeNull();
    });

    it('validator fields not empty type query', async () => {
        let requiredFields = ['username', 'password'];
        let bodyType = 'query';
        let crudFactory = new CrudFactoryMock();
        let validatorFieldsNotEmpty = crudFactory.validatorFieldsNotEmpty(requiredFields, bodyType);
        
        expect(validatorFieldsNotEmpty).not.toBeNull();
    });

    it('validator fields not empty type param', async () => {
        let requiredFields = ['username', 'password'];
        let bodyType = 'param';
        let crudFactory = new CrudFactoryMock();
        let validatorFieldsNotEmpty = crudFactory.validatorFieldsNotEmpty(requiredFields, bodyType);
        
        expect(validatorFieldsNotEmpty).not.toBeNull();
    });

    it('call database type get', async () => {
        let repositoryDTO = {
            entity: UserAuthentication,
            method: 'GET',
            whereCondition: {
                username: 'rafa_test'
            },
            isReplicaDatabase: false
        } as RepositoryDTO;
        let crudFactory = new CrudFactoryMock();
        let callDatabase = crudFactory.callDatabase(repositoryDTO);
        
        console.log(`callDatabase: ${JSON.stringify(callDatabase)}`);
    });

    it('call database type query', async () => {
        let repositoryDTO = {
            entity: UserAuthentication,
            method: 'QUERY',
            queryType: 'SELECT',
            query: 'SELECT * FROM user_authentication',
            isReplicaDatabase: false
        } as RepositoryDTO;
        let crudFactory = new CrudFactoryMock();
        let callDatabase = crudFactory.callDatabase(repositoryDTO);
        
        console.log(`callDatabase: ${JSON.stringify(callDatabase)}`);
    });
});
