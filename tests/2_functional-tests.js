const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const assert = chai.assert;

suite('Functional Tests', () => {

    test('Viewing one stock: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: 'AAPL' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'stockData');
                assert.property(res.body.stockData, 'symbol');
                assert.property(res.body.stockData, 'price');
                assert.property(res.body.stockData, 'likes');
                done();
            });
    });

    test('Viewing one stock and liking it: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: 'AAPL', like: 'true' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body.stockData, 'likes');
                done();
            });
    });

    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: 'AAPL', like: 'true' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body.stockData, 'likes');
                done();
            });
    });

    test('Viewing two stocks: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: ['AAPL', 'GOOG'] })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isArray(res.body.stockData);
                assert.property(res.body.stockData[0], 'symbol');
                assert.property(res.body.stockData[1], 'symbol');
                done();
            });
    });

    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: ['AAPL', 'GOOG'], like: 'true' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isArray(res.body.stockData);
                assert.property(res.body.stockData[0], 'rel_likes');
                assert.property(res.body.stockData[1], 'rel_likes');
                done();
            });
    });
});

