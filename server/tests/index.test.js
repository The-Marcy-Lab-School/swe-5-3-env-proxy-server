const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('GET /api/gifs', () => {
  it('responds with status 200 and returns gifs data', async () => {
    const response = await request(app).get('/api/gifs');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('handles errors and responds with status 503', async () => {
    // Simulate an error by temporarily removing the API key
    const originalEnv = process.env.GIPHY_API_KEY;
    process.env.GIPHY_API_KEY = '';
    const response = await request(app).get('/api/gifs');
    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty('error');
    process.env.GIPHY_API_KEY = originalEnv;
  });
}); 