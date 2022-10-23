import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Should return 400', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
});

describe('Should return 200', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=400'
    );
    expect(response.status).toBe(200);
  });
});
