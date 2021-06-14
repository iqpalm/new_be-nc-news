const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app');
const request = require('supertest');
const runSeed = () => {
  return seed(testData);
};

beforeEach(() => runSeed);
afterAll(() => db.end());

describe('GET - /api/topics', () => {
  test('GET - status 200 - responds with an array of topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          topics: [
            { slug: 'mitch', description: 'The man, the Mitch, the legend' },
            { slug: 'cats', description: 'Not dogs' },
            { slug: 'paper', description: 'what books are made of' }
          ]
        });
      });
  });
});
describe('GET - /*', () => {
  test('GET - status 404 path not found- ', () => {
    return request(app)
      .get('/api/tropics')
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: 'invalid path' });
      });
  });
});
