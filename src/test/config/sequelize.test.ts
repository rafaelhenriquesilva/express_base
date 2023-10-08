import sequelize from '../../config/sequelize';

describe('Database Connection', () => {
  let connection = sequelize.original;
  it('should connect to the database successfully', (done) => {
    
    connection.authenticate()
      .then(() => {
        expect(true).toBe(true);
        done();
      })
      .catch(error => {
        done(error);
      });
  }, 10000);

  afterAll(async () => {
    await connection.close();
  });

});
