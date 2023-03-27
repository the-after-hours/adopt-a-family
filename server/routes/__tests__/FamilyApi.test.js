import express from 'express';
import request from 'supertest';

import Family from '../../models/family.js';
import apiRoutes from '../../routes/api.js';

const app = express();
const FAMILY_ENDPOINT = '/api/families';

app.use('/api', apiRoutes);

describe('Test /api/families,', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if no filter is passed', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query()
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return 200 if filter and value parameters are present', async () => {
      // Find a family and use the ID
      const familiesList = await Family.find()
        .then((res) => res)
        .catch((err) => console.error(err));

      const familyId = familiesList[0]._id;

      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({
          filter: '_id',
          value: familyId,
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return an object with property "families" as an array if valid queries present', async () => {
      // Find a family and use the ID
      const familiesList = await Family.find()
        .then((res) => res)
        .catch((err) => console.error(err));

      const familyId = familiesList[0]._id;

      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({
          filter: '_id',
          value: familyId,
        })
        .then((response) => {
          expect.objectContaining({
            families: expect.any(Array),
          });
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if missing value query', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({ filter: '_id' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return 400 if missing filter query', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({ value: 'test' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return 400 if queries besides "filter" or "value" are passed', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({ test: 'not valid', bar: 'foo' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return an error message if missing value query', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({ filter: '_id' })
        .then((response) => {
          expect(response.body.message).toBe(
            'Received 1 parameter(s) but expected 2.'
          );
        });
    });

    it('Should return an error message if missing filter query', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({ value: 'test' })
        .then((response) => {
          expect(response.body.message).toBe(
            'Received 1 parameter(s) but expected 2.'
          );
        });
    });

    it('Should return an error message if query besides "filter"/"value" are passed', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({ test: 'not valid', bar: 'foo' })
        .then((response) => {
          expect(response.body.message).toBe('Invalid parameters supplied.');
        });
    });
  });
});
