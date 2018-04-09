const request = require('supertest');
const express = require('express');
const app = express();
const apiRoutes = require('../../routes/api');

const WISHLIST_ENDPOINT = '/api/wishlist';
const WISHLIST_CREATE_ENDPOINT = '/api/wishlist/addItem';

app.use('/api', apiRoutes);

describe.skip('Test wishlist GET route, /api/wishlist/id', () => {
  describe('Test 200 responses', () => {
    // Broken because we don't know how to pull the wishlist id (it changes with each seed)
    it.skip('Should return 200 if a valid wishlist_ID is passed', () => {
      return request(app)
        .get(WISHLIST_ENDPOINT + 'REAL_WISHLIST_ID')
        .query.then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
    // Broken because we don't know how to pull the wishlist id (it changes with each seed)
    it.skip('Should return 200 if a valid family_ID is passed', () => {
      return request(app)
        .get(WISHLIST_ENDPOINT + 'REAL_FAMILY_ID')
        .query.then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if no wishlist or family id passed', () => {
      return request(app)
        .get(WISHLIST_ENDPOINT)
        .query.then(response => {
          expect(response.statusCode).toBe(400);
        });
    });
  });

  describe('Test other errors', () => {
    // Do stuff here
  });
});

describe.skip('Test POST routes, /api/wishlist/addItem', () => {
  describe('Test 201 responses', () => {
    it('Should return 201 when a successful wishlist is created', () => {
      return request(app)
        .post(WISHLIST_CREATE_ENDPOINT)
        .set('Content-Type', 'application/json')
        .send({
          familyId: '5a6ea08a3385f71d87699b5c',
          item: { itemName: 'Eraser', itemQuantity: 5, itemCost: 3 },
        })
        .query.then(response => {
          expect(response.statusCode).toBe(201);
        });
    });
  });
  describe('Test 400 responses', () => {
    // Write some 400 tests
  });
  describe('Test 500 responses', () => {
    // Write some 500 tests
  });
});
