var expect = chai.expect;
describe('MyAPI', function () {
    var xhr;
    var requests;
    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    afterEach(function() {
        xhr.restore();
    });
});