var http = require('http');
var fs = require('fs');
var vm = require('vm');
var url = require('url');
var gufudb = require('gufudb');

global.lib = '/usr/local/lib/openjscad/';             // for now hard-coded
global.nodeModules = '/usr/local/lib/node_modules/';  // for now hard-coded too

if (!fs.existsSync(global.lib))           // requires node 0.10.1 
    global.lib = './';

var CSG = require(lib+'./csg.js').CSG;
var CAG = require(lib+'./csg.js').CAG;

var prototype = fs.readFileSync('./prototype.jscad', 'utf-8').toString('utf-8');
var scad = fs.readFileSync(lib+'./openscad.js');

function makeModel(params, req, res) {
    res.writeHead(200, {
	'Content-Type': 'application/sla',
	'Content-Disposition': 'attachment; filename="gift-token.stl"'
    });
    code = params.query.code;
  
    var csg = eval(prototype.replace('42AQLUE', code) + '\n' + scad + '\nmain()');
    res.end(csg.toStlString());
}

http.createServer(function (req, res) {
    var params = url.parse(req.url, true);
    var path = params.pathname.toLowerCase();
    if (path == '/makemodel') {
	makeModel(params, req, res);
    } else if (path == '/showform') {
    } else if (path == '/makecode') {
    } else if (path == '/getcode') {
    } else {
	res.writeHead(400);
	res.end("Page not found.");
    }
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000/');
