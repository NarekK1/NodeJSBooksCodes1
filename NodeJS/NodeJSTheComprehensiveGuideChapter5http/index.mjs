 
import { constants,createSecureServer, get, /*Server*/ request } from 'http';
import { formidable } from 'formidable';
import { parse } from 'querystring';
import { saveAddress } from './save.mjs';
import data from './data.mjs';
import { getList } from './list.mjs';
import { deleteAddress } from './delete.mjs';
import { send } from 'process';
import { getForm } from './form.mjs';
import { readFile, rename, readFileSync } from 'fs';
// start the server
// const server = new Server();

// Destructure necessary constants from http module
const {
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS,
    HTTP2_HEADER_METHOD
} = constants;

// SSL options for HTTPS server
const options = {
    key: readFileSync('./localhost.key'),
    cert: readFileSync('./localhost.crt')
}

// Create an HTTP server that serves a simple HTML page
createSecureServer(function(request, response){
    let responseBody;
    // Parse the URL to determine the requested action
    const parts = request.url.split('/');
    if(parts.includes('delete')){
        // Delete the address with the given ID
        data.addresses = deleteAddress(data.addresses, parts[2]);
        redirect(response, '/');
    }
    else if(parts.includes('new')){
        // Serve the form for creating a new address
        send(response, getForm());
    }
    else if(parts.includes('edit')){
        // Serve the form for editing an existing address
        send(response, getForm(data.addresses, parts[2]));
    }
    else if(parts.includes('save') && request.method === 'POST'){
        const form = new formidable.IncomingForm();
        form.parse(request, function(err, address, files){
            if(files.upload){
                rename = (files.upload.path, `public/assets/${files.upload.name}`, function(){
                    address['file'] = `assets/${file.upload.name}`;
                });
            }
            data.addresses = saveAddress(data.addresses, address);
            redirect(response, '/');
        });
    }
      else if(request.url === '/style.css'){
            readFile('chapter5http/style.css', 'utf8', function(err, data){
                if(err){
                    response.statusCode = 404;
                    response.end();
                }
                else {
                    response.end(data);
                }
            })
        }   
        else if (parts.includes('assets')){
            readFile(`public${request.url.replaceAll('%20', ' ' )}`, function(err, data){
                if(err){
                    response.statusCode = 404;
                    response.end();
                }
                else{
                    response.end(data);
                }
            })
        }
 else if(request.url === '/style.css'){
            readFile('chapter5http/style.css', 'utf8', function(err, data){
                if(err){
                    response.statusCode = 404;
                    response.end();
                }
                else {
                    response.end(data);
                }
            })
        }   
        else{
            send(response, getList(data.addresses));
        }
        let body  = '';
        request.on('readable', function(){
            const data = request.read();
            body += data !== null ? data : '';
        })
        request.on('end', function(){
            const address = parse(body);
            addresses = saveAddress(data.addresses, address);
            redirect(response, '/');
        })
           // Generate the HTML list of addresses
        // response.writeHead(200, {'content-type': 'text/html'});
        // responseBody = getList(data.addresses);
        // response.end(responseBody);
         
    // Set the status code to 200 (OK)
    // response.setStatusCode = 200;
    // Set the Content-Type header to text/html
    // response.setHeader('content-type', 'text/html');
    // Alternative way to set status code and headers
    // response.writeHead(200, {'content-type': 'text/html'});
    // const responseBody = getList(data.addresses);
    // Write the response body
    // response.write(responseBody);
    // End the response
    // response.end(responseBody);
    // Send the response body
    // response.end(responseBody);
    // Listen on port 8080
}).listen(8080, function(){
    console.log('Addres book reachable via http://localhost:8080');
});

// Create and start the server
// server.on('listening', function(){
    // console.log('Addres book reachable via http://localhost:8080');
// });
// //listen on port 8080
// server.listen(8080);
function redirect(response, to){
    response.writeHead(302, {location: '/', 'content-type': 'text/plain'});
    response.end('302 Redirecting to /');
}