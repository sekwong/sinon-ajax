var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough; //test-double for streams
var http = require('http');
var api = require('../api.js');
describe('api', function () {
    var request;

    beforeEach(function () {
        this.request = sinon.stub(http, 'request');
    });

    afterEach(function () {
        this.request.restore();
    });

    it('should convert get result to object', function (done) {
        var expected = { hello: 'world' };
        var response = new PassThrough();
        response.write(JSON.stringify(expected));
        response.end();

        var request = new PassThrough();
        this.request.yields(response).returns(requesßt);

        api.get(function (err, result) {
            assert.deepEqual(result, expected);
            done();
        });
    });
});