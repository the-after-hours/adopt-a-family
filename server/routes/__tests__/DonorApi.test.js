const request = require('supertest');
const express = require('express');
const app = express();
const apiRoutes = require('../../routes/api');
const Donor = require('../../models/family');

const DONOR_ENDPOINT = '/api/donors';

app.use('/api', apiRoutes);

// Broken aka i haven't written the tests yet
describe.skip('Test /api/donors,', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if no filter is passed', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query()
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return 200 if filter and value parameters are present', async () => {
      // Find a family and use the ID
      const donorsList = await Donor.find()
        .then(res => res)
        .catch(err => console.error(err));

      const familyId = donorsList[0]._id;

      return request(app)
        .get(DONOR_ENDPOINT)
        .query({
          filter: '_id',
          value: familyId,
        })
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return an object with property "donors" as an array if valid queries present', async () => {
      // Find a family and use the ID
      const donorsList = await Donor.find()
        .then(res => res)
        .catch(err => console.error(err));

      const familyId = donorsList[0]._id;

      return request(app)
        .get(DONOR_ENDPOINT)
        .query({
          filter: '_id',
          value: familyId,
        })
        .then(response => {
          expect.objectContaining({
            donors: expect.any(Array),
          });
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if missing value query', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ filter: '_id' })
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return 400 if missing filter query', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ value: 'test' })
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return 400 if queries besides "filter" or "value" are passed', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ test: 'not valid', bar: 'foo' })
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return an error message if missing value query', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ filter: '_id' })
        .then(response => {
          expect(response.body.message).toBe(
            'Received 1 parameter(s) but expected 2.'
          );
        });
    });

    it('Should return an error message if missing filter query', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ value: 'test' })
        .then(response => {
          expect(response.body.message).toBe(
            'Received 1 parameter(s) but expected 2.'
          );
        });
    });

    it('Should return an error message if query besides "filter"/"value" are passed', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ test: 'not valid', bar: 'foo' })
        .then(response => {
          expect(response.body.message).toBe('Invalid parameters supplied.');
        });
    });
  });
});

describe('Test /api/donors/:filter', () => {
  describe('Test 200 responses', () => {});
  describe('Test 400 responses', () => {});
});
