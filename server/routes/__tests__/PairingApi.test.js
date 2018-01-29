const request = require('supertest');
const app = require('../../../server/app');

const PAIRING_ENDPOINT = '/api/pairing';
describe('Test /api/pairing', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if valid budget param is passed', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
    it('Should display appropriate message if no donors found', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: 400 })
        .then(response => {
          expect(response.body.message).toBe('No donors were found');
        });
    });
    it('Should only print no-donor message if donors found is 0', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: 400 })
        .then(response => {
          expect(response.body.donors).toHaveLength(0);
        });
    });
    it('Should print success message if donors are found', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then(response => {
          expect(response.body.message).toBe('Donors were found');
        });
    });
    it('Should only print donors-found message if donors found is >0', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then(response => {
          expect(response.body.donors).not.toHaveLength(0);
        });
    });
    // Skipping this until we enhance seed to include more donors
    it.skip('Should sort donors in ascending budget order', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ buddget: 50000 })
        .then(response => {
          expect(response.body.donors[0].budget).toBeGreaterThan(
            response.body.donors[1].budget
          );
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if budget param is not passed', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should return 400 if budget set to null', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: 'null' })
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should return 400 if budget set to undefined', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .query({ budget: undefined })
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should display error message if budget param is missing', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .then(response => {
          expect(response.body.message).toBe('Missing Budget Param');
        });
    });
    it.skip('Queries without wishlist param return 400 -- IS THIS VALID', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });
  });

  describe('Other error messages', () => {
    it.skip('Should return 500 if there are errors grabbing data from db', () => {
      // Make this work somehow...
    });
  });
});
