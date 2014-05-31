var http = require('http');
var fs = require('fs');
var vm = require('vm');
var url = require('url');

global.lib = '/usr/local/lib/openjscad/';             // for now hard-coded
global.nodeModules = '/usr/local/lib/node_modules/';  // for now hard-coded too

if (!fs.existsSync(global.lib))           // requires node 0.10.1 
    global.lib = './';

var CSG = require(lib+'./csg.js').CSG;
var CAG = require(lib+'./csg.js').CAG;

var prototype = fs.readFileSync('./prototype.jscad', 'utf-8').toString('utf-8');
console.log(prototype);

var scad = fs.readFileSync(lib+'./openscad.js');

http.createServer(function (req, res) {
    res.writeHead(200, {
	'Content-Type': 'application/sla',
	'Content-Disposition': 'attachment; filename="gift-token.stl"'
    });
    params = url.parse(req.url, true);
    code = params.query.code;
  
    var csg = eval(prototype.replace('42AQLUE', code) + '\n' + scad + '\nmain()');
    res.end(csg.toStlString());
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000/');
