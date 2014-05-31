// Try to use only characters that will be nicely represented by the
// 3D printer.
var giftCodeCharacters = 'ETFHLZXNAV';
var radix = giftCodeCharacters.length;
var maxCodeLength = 5;
var maxRepresentable = Math.pow(giftCodeCharacters.length, maxCodeLength);
var minNumber = 20;

var Datastore = require('nedb'),
    db = new Datastore({ filename: '../gufu.db', autoload: true });

// Will call |cb| with a single parameter, a number that can be used
// to look up the URL, that will take 5 or fewer characters to
// represent.
exports.addUrlForNumber = function(url, cb) {
    var randomNumber = Math.floor(Math.random() * (maxRepresentable - minNumber)) + minNumber;
    db.insert({"giftcode": randomNumber, "url": url}, function(err) {
	if (err)
	    console.log("Error db.insert", err);
	cb(randomNumber);
    });
}

// Will call |cb| with a single parameter, the URL for that number, or
// the empty string if no such URL.
exports.getUrlForNumber = function(number, cb) {
    db.findOne({"giftcode": number}, function(err, doc) {
	if (!doc)
	    cb("");
	else
	    cb(doc.url);
    });
}

exports.giftCodeFromNumber = function(number) {
    var output = '';
    do {
	output = output.concat(giftCodeCharacters.charAt(number % radix));
	number = number / radix;
    } while (number >= 1.0);
    return output;
}

exports.numberFromGiftCode = function(giftCode) {
    var number = 0;
    var multiplier = 1;
    for (var i = 0; i < giftCode.length; ++i) {
	number = number + multiplier * giftCodeCharacters.indexOf(giftCode.charAt(i));
	multiplier = multiplier * radix;
    }
    return number;
}

// Will call |cb| with a single parameter, the gift code generated for the URL.
exports.addUrl = function(url, cb) {
    exports.addUrlForNumber(url, function(number) {
	cb(exports.giftCodeFromNumber(number));
    });
};

// Will call |cb| with a single parameter, the URL stored for the
// given gift code, or the empty string if no such URL is found.
exports.getUrl = function(giftCode, cb) {
    console.log("Gift code " + giftCode);
    var number = exports.numberFromGiftCode(giftCode);
    console.log("Number from code " + number);
    exports.getUrlForNumber(number, cb);
};
