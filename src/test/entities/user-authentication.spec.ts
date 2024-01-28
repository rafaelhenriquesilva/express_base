
import { UserAuthentication } from '../../domain/entities/user-authentication/user-authentication';

const CreateUserAuthentication = () => {
    const userAuthentication = new UserAuthentication({
        id: '26914c9f-d105-43f7-8d3d-0bedb4b7b92b',
        password: '1234test',
        createdAt: new Date(),
        isActive: true,
        token: 'token-valid',
        updatedAt: new Date(),
        username: 'test123'
    })
    return userAuthentication
}
describe('UserAuthentication', () => {
    it('Create User authenticathion', () => {
        const userAuthentication = CreateUserAuthentication()
        expect(userAuthentication.id).toBeDefined()
        expect(userAuthentication.password).toBeDefined()
        expect(userAuthentication.token).toBeDefined()
        expect(userAuthentication.username).toBeDefined()
        expect(userAuthentication.isActive).toBeTruthy()
    })
})
