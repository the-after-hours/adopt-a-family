import request from 'supertest';
import express from 'express';
const app = express();
import apiRoutes from '../../routes/api';
import Donor from '../../models/family';

const DONOR_ENDPOINT = '/api/donors';

app.use('/api', apiRoutes);

describe('Test /api/donors,', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if no filter is passed', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query()
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return an object with property "donors" as an array', async () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query()
        .then((response) => {
          expect.objectContaining({ donors: expect.any(Array) });
        });
    });
  });

  describe('Test 400 responses', () => {
    it('Should return 400 if many queries are passed', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ filter: '_id', value: '123abc', thirdValue: 'xyz' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });

    it('Should return the correct error message if any queries passed', () => {
      return request(app)
        .get(DONOR_ENDPOINT)
        .query({ filter: '_id', value: '123abc' })
        .then((response) => {
          expect(response.body.message).toBe(
            'Received 2 parameter(s) but expected 0.'
          );
        });
    });
  });
});

describe('Test /api/donors/:filter', () => {
  describe('Test 200 responses', () => {
    it('Should return 200 if filter and value parameters are present', async () => {
      // Find a family and use the ID
      const donorsList = await Donor.find()
        .then((res) => res)
        .catch((err) => console.error(err));

      const donorId = donorsList[0]._id;
      const param = '_id';

      return request(app)
        .get(DONOR_ENDPOINT + '/' + param)
        .query({ donorId })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return an object with property "donors" as an array if valid queries present', async () => {
      // Find a family and use the ID
      const donorsList = await Donor.find()
        .then((res) => res)
        .catch((err) => console.error(err));

      const donorId = donorsList[0]._id;
      const param = '_id';

      return request(app)
        .get(DONOR_ENDPOINT + '/' + param)
        .query({ donorId })
        .then((response) => {
          expect.objectContaining({ donors: expect.any(Array) });
        });
    });

    it('Should return 200 if filter is valid but value is invalid', async () => {
      const donorId = 111;
      const param = '_id';

      return request(app)
        .get(DONOR_ENDPOINT + '/' + param)
        .query({ donorId })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    it('Should return an object with property "donors" as an EMPTY array if query is not valid but filter is valid and nothing is found', async () => {
      const donorId = 111;
      const param = '_id';

      return request(app)
        .get(DONOR_ENDPOINT + '/' + param)
        .query({ donorId })
        .then((response) => {
          expect(response.body.donors).toHaveLength(0);
        });
    });

    it('Should return an object with property "donors" as an EMPTY array if the filter is not valid but query is valid and nothing is not found', async () => {
      const donorsList = await Donor.find()
        .then((res) => res)
        .catch((err) => console.error(err));

      const donorId = donorsList[0]._id;
      const param = '_id';

      return request(app)
        .get(DONOR_ENDPOINT + '/' + param)
        .query({ donorId })
        .then((response) => {
          expect(response.body.donors).toHaveLength(0);
        });
    });
  });

  describe('Test 400 responses', () => {});
});
