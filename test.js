var expect = chai.expect;
describe('MyAPI', function () {
    var xhr;
    var requests;
    // set up fake xhr
    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    it('should parse fetched data as JSON', function (done) {
        var data = { foo: 'bar' };
        var dataJson = JSON.stringify(data);
        myapi.get(function (err, result) {
            expect(result).to.deep.equal(data);
            done();
        });
        // response with fake data from fak xhr
        requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });

    it('should send given data as JSON body', function () {
        var data = { hello: 'world' };
        var dataJson = JSON.stringify(data);
        myapi.post(data, function () { });
        expect(requests[0].requestBody).to.equal(dataJson);
    });

    it('should return error into callback', function (done) {
        myapi.get(function (err, result) {
            expect(err).to.exist;
            done();
        });
        requests[0].respond(500);
    });

    afterEach(function () {
        xhr.restore();
    });
});