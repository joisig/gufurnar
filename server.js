var http = require('http');
var fs = require('fs');
var vm = require('vm');
var url = require('url');
var path = require('path');
var gufudb = require('./gufudb');

global.lib = '/usr/local/lib/openjscad/';             // for now hard-coded
global.nodeModules = '/usr/local/lib/node_modules/';  // for now hard-coded too

if (!fs.existsSync(global.lib))           // requires node 0.10.1 
    global.lib = './';

var CSG = require(lib+'./csg.js').CSG;
var CAG = require(lib+'./csg.js').CAG;

var prototype = fs.readFileSync('./prototype.jscad', 'utf-8').toString('utf-8');
var scad = fs.readFileSync(lib+'./openscad.js');
var formHtml = fs.readFileSync('./form.html', 'utf-8').toString('utf-8');
var createdHtml = fs.readFileSync('./created.html', 'utf-8').toString('utf-8');

var otherFiles = {};

function makeModel(params, req, res) {
    res.writeHead(200, {
	'Content-Type': 'application/sla',
	'Content-Disposition': 'attachment; filename="gift-token.stl"'
    });
    var code = params.query.code;
  
    var csg = eval(prototype.replace('42AQLUE', code) + '\n' + scad + '\nmain()');
    res.end(csg.toStlString());
}

function makeCode(params, req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var destination = params.query.url;
    gufudb.addUrl(destination, function(giftCode) {
	res.end(createdHtml.replace(/42AQLUE/g, giftCode));
    });
}

function getCode(code, req, res) {
    gufudb.getUrl(code, function(url) {
	if (url == "") {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end('Found no URL for that code.');
	} else {
	    res.writeHead(302, {'Location': url});
	    res.end();
	}
    });
}

function showForm(params, req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(formHtml);
    res.end();
}

http.createServer(function (req, res) {
    var params = url.parse(req.url, true);
    var uri = params.pathname, filename = path.join(process.cwd(), uri);
    var urilower = uri.toLowerCase();
    path.exists(filename, function(exists) {
	if (exists && !fs.statSync(filename).isDirectory()) {
	    fs.readFile(filename, "binary", function(err, file) {
		if(err) {     
		    res.writeHead(500, {"Content-Type": "text/plain"});
		    res.write(err + "\n");
		    res.end();
		    return;
		}
		
		res.writeHead(200);
		res.write(file, "binary");
		res.end();
	    });
	} else {
	    if (urilower == '/makemodel') {
		makeModel(params, req, res);
	    } else if (urilower == '/showform' || urilower == '/') {
		showForm(params, req, res);
	    } else if (urilower == '/makecode') {
		makeCode(params, req, res);
	    } else {
		var code = params.pathname.substr(1);
		console.log("Code requested: " + code);
		getCode(code, req, res);
	    }
	}
    });
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000/');
