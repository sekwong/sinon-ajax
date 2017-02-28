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
        this.request.yields(response).returns(request);

        api.get(function (err, result) {
            assert.deepEqual(result, expected);
            done();
        });
    });

    // we only need to verify request.write is called
    it('should send post params in request body', function () {
        var params = { foo: 'bar' };
        var expected = JSON.stringify(params);
        var request = new PassThrough();
        var write = sinon.spy(request, 'write');
        this.request.returns(request);
        api.post(params, function () { });
        sinon.assert.calledWith(write, expected);
    });

    it('should pass request error to callback', function (done) {
        var expected = 'some error';
        var request = new PassThrough();
        this.request.returns(request);
        api.get(function (err) {
            assert.equal(err, expected);
            done();
        });
        request.emit('error', expected);
    });
});