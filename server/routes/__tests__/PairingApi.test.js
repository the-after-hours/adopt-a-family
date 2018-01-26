const request = require('supertest');
const app = require('../../../server/app');

describe('Test /api/pairing', () => {
  test('Sucessful queries return a 200', () => {
    return request(app)
      .get('/api/')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  test('Queries without budget param return 400', () => {
    return request(app)
      .get('/api/')
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });
  test('Queries without wishlist param return 400', () => {
    return request(app)
      .get('/api/')
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });
  test('If no results are found, appropriate message is shown', () => {
    return request(app)
      .get('/api/')
      .then(response => {
        expect(response.body.message).toBe('No donors were found');
      });
  });
  test('If results are found print success message', () => {
    return request(app)
      .get('/api/')
      .then(response => {
        expect(response.body.message).toBe('Donors were found');
      });
  });
});
