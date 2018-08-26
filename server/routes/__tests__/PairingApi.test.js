const request = require('supertest');
const express = require('express');
const app = express();
const apiRoutes = require('../../routes/api');

const BUDGET_PAIRING_ENDPOINT = '/api/pairing/budget';
const WISHLIST_PAIRING_ENDPOINT = '/api/pairing/:familyId';

app.use('/api', apiRoutes);

describe('Test GET /api/pairing/budget', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if valid budget param is passed', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
    it('Should display appropriate message if no donors found', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: 400 })
        .then((response) => {
          expect(response.body.message).toBe('No donors were found');
        });
    });
    it('Should only print no-donor message if donors found is 0', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: 400 })
        .then((response) => {
          expect(response.body.donors).toHaveLength(0);
        });
    });
    it('Should print success message if donors are found', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then((response) => {
          expect(response.body.message).toBe('Donors were found');
        });
    });
    it('Should only print donors-found message if donors found is >0', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then((response) => {
          expect(response.body.donors).not.toHaveLength(0);
        });
    });
    // Skipping this until we enhance seed to include more donors
    it.skip('Should sort donors in ascending budget order', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ buddget: 50000 })
        .then((response) => {
          expect(response.body.donors[0].budget).toBeGreaterThan(
            response.body.donors[1].budget
          );
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if budget param is not passed', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should return 400 if budget set to null', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: 'null' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should return 400 if budget set to undefined', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .query({ budget: undefined })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should display error message if budget param is missing', () => {
      return request(app)
        .get(BUDGET_PAIRING_ENDPOINT)
        .then((response) => {
          expect(response.body.message).toBe('Missing Budget Param');
        });
    });
  });

  describe('Other error messages', () => {
    it.skip('Should return 500 if there are errors grabbing data from db', () => {
      // Make this work somehow...
    });
  });
});

/******************************
// I NEED TO FIX THESE TESTS //
******************************/
/**
 * @todo Fix /api/pairing/:familyId tests
 * @body Tests for the route are currently all set to skip
 */
describe.skip('Test /api/pairing/:familyId', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if valid budget param is passed', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
    it('Should display appropriate message if no donors found', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: 400 })
        .then((response) => {
          expect(response.body.message).toBe('No donors were found');
        });
    });
    it('Should only print no-donor message if donors found is 0', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: 400 })
        .then((response) => {
          expect(response.body.donors).toHaveLength(0);
        });
    });
    it('Should print success message if donors are found', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then((response) => {
          expect(response.body.message).toBe('Donors were found');
        });
    });
    it('Should only print donors-found message if donors found is >0', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: 50000 })
        .then((response) => {
          expect(response.body.donors).not.toHaveLength(0);
        });
    });
    // Skipping this until we enhance seed to include more donors
    it.skip('Should sort donors in ascending budget order', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ buddget: 50000 })
        .then((response) => {
          expect(response.body.donors[0].budget).toBeGreaterThan(
            response.body.donors[1].budget
          );
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if budget param is not passed', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it.skip('Queries without wishlist param return 400 -- IS THIS VALID', () => {
      return request(app)
        .get(PAIRING_ENDPOINT)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should return 400 if budget set to null', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: 'null' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should return 400 if budget set to undefined', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .query({ budget: undefined })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    it('Should display error message if budget param is missing', () => {
      return request(app)
        .get(WISHLIST_PAIRING_ENDPOINT)
        .then((response) => {
          expect(response.body.message).toBe('Missing Budget Param');
        });
    });
  });

  /**
   * @todo Write Pairing tests for 500 repsonses
   * @body Need to figure out what test would fall in non 200,400 responses. If there are some, I need to write them.
   */
  describe('Other error messages', () => {
    it.skip('Should return 500 if there are errors grabbing data from db', () => {
      // Make this work somehow...
    });
  });
});
