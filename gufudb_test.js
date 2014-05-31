var gufudb = require('./gufudb');

exports.testAddUrlForNumber = function(test) {
    gufudb.addUrlForNumber('http://www.google.com/', function(giftcode) {
	console.log("Got number: " + giftcode);
	test.done();
    });
};

exports.testGetUrlForNumber = function(test) {
    gufudb.addUrlForNumber('http://www.google.com/', function(number) {
	gufudb.getUrlForNumber(number, function (url) {
	    test.ok(url == 'http://www.google.com/', "wrong URL " + url);
	    test.done();
	});
    });
};

exports.testBackAndForthToGiftCode = function(test) {
    for (var i = 0; i < 5000; ++i) {
	var giftCode = gufudb.giftCodeFromNumber(i);
	var resultingNumber = gufudb.numberFromGiftCode(giftCode);
	test.ok(i == resultingNumber);
    }
    test.done();
};

