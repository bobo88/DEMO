var http = require('http');

http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<head><meta charset="utf-8"/></head>');
	res.end('Hello NodeJS!');
}).listen(3333,'127.0.0.1');
console.log('Server run in http://127.0.0.1:3333');