const request = require('supertest');
const express = require('express');
const app = express();
const apiRoutes = require('../../routes/api');
const Family = require('../../models/family');

const FAMILY_ENDPOINT = '/api/families';

app.use('/api', apiRoutes);

describe('Test /api/families,', () => {
  describe('Test 200 responses', () => {
    // TODO: this fails still
    it.skip('Should return 200 if no filter is passed', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query()
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return 200 if filter and value parameters are present', async () => {
      // Find a family and use the ID
      const familiesList = await Family.find()
        .then(res => res)
        .catch(err => console.error(err));

      const familyId = familiesList[0]._id;

      return request(app)
        .get(FAMILY_ENDPOINT)
        .query({
          filter: '_id',
          value: familyId,
        })
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    // TODO: this fails still
    it.skip('Should return 200 if valid filter is passed', () => {
      return request(app)
        .get(FAMILY_ENDPOINT)
        .query()
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe('Test 400 responses', () => {});
});
