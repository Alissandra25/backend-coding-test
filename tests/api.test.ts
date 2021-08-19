'use strict';

const request = require('supertest');
const should = require('should');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const appl = require('../src/app.ts');
const buildSchemas = require('../src/schemas.ts');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(appl)
          .get('/health')
          .expect('Content-Type', /text/)
          .expect(200, done);
    });
  });

  describe('POST /rides', () => {
    it('should return created entity with property "created"', (done) => {
      const ride = {
        'start_lat': '66.57',
        'start_long': '22.20',
        'end_lat': '23.43',
        'end_long': '99.125',
        'rider_name': 'Uber',
        'driver_name': 'Tony Stark',
        'driver_vehicle': 'Iron Man',
      };
      request(appl)
          .post('/rides')
          .send(ride)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);
            checkRideObject(res);
            done();
          });
    });
  });


  describe('GET /rides', () => {
    it('should return array of rides', (done) => {
      request(appl)
          .get('/rides')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);
            res.body.should.be.Array();
            res.body.should.not.be.empty();
            done();
          });
    });
  });

  describe('GET /rides/:id', () => {
    it('should return ride by ID', (done) => {
      request(appl)
          .get('/rides/1')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);
            checkRideObject(res);
            done();
          });
    });
  });
});

/**
 * Check ride to be a valid object
 * @param {Ride} res API response.
 */
function checkRideObject(res) {
  res.body.should.be.Object();
  res.body.should.have.properties([
    'created',
    'startLat',
    'startLong',
    'endLat',
    'endLong',
    'riderName',
    'driverName',
    'driverVehicle',
  ]);
  res.body.created.should.be.String();
}

