var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('http');
var api = require('../api.js');
describe('api', function () {
    var request;

    beforeEach(function () {
        request = sinon.stub(http, 'request');
    });
    
    afterEach(function () {
        request.restore();
    });
    //We'll place our tests cases here
});