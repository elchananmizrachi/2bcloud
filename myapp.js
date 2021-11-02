var http = require('http');
var handleRequest = function(request, respone){
    respone.writeHead(200);
    respone.write("UTC time - " + new Date().toISOString().replace('T', ' ').substring(0, 19));
    respone.write("\r\n");

    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = Object.create(null); // or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                respone.write("Hello World!" + "\n");
            }
        }
    }
    
var www = http.createServer(handleRequest);
www.listen(3000);

