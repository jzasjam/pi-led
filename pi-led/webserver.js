var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http, {allowEIO3: true}) //require socket.io module and pass the http object (server)
var path = require('path');

//Using the standalone hw-specific library
let matrix = require('sense-hat-led');
//Using this library
matrix = require('node-sense-hat').Leds;

const x = 3;
const y = 3;
const red = [255,0,0];

http.listen(8080); //listen to port 8080
console.log("Server Running (Ctrl+C to stop)");

function handler (request, res) { //create server
  
  var filePath = '.' + request.url;
  console.log(filePath);
  if(filePath == './'){
    filePath = '/public/index.html';
  } else {
    filePath = '/public' + request.url;
  }
  console.log(filePath);
  var extname = path.extname(filePath); //For routing different static files
  console.log(extname);
  
  var contentType = 'text/html';
  switch(extname){
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.png':
        contentType = 'image/png';
        break;
  }
  
  fs.readFile(__dirname + filePath, function(err, data){
    
    if(err){
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data, 'utf-8');
  });
  
  /*
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
  */
  
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  
  var lightvalue = 0; //static variable for current status
  
  //SWITCH A PIXEL ON/OFF
  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue) {
      console.log(lightvalue);
      matrix.setPixel(x,y,red); //turn LED on or off, for now we will just show it in console.log
    }else{
      matrix.clear();
    }
  });
  
  
  //SET THE PIXEL VAULES ON THE PI
  socket.on('pi-led', function(data) { //get pixel codes from client
    pixels = data;
    console.log(":)");
    if (pixels) {
      console.log(pixels);
      //matrix.setPixel(x,y,red); //turn LED on or off, for now we will just show it in console.log
      matrix.setPixels(pixels);
	
    }else{
      matrix.clear();
    }
  });

  //GET THE PIXEL VAULES ON THE PI
  socket.on('pi-led-status', function(data) { //get pixel codes from client
    console.log(matrix.getPixels());
    return matrix.getPixels();
  });

  //RECEIVE A MESSAGE TO DISPLAY ON THE PI LEDS
  socket.on('message', function(data) { //get light switch status from client
    message = data;
    if (message) {
      console.log('Message: '+message['message']);
      console.log('Color: '+message['color']);
      console.log('BG Color: '+message['bgcolor']);
      //return;
      //matrix.showMessage("Hello World!",0.1,[255,0,0],[0,255,0]); //Display message: Message, Speed, Text Colour, Background Colour
      matrix.showMessage(message['message'],message['speed'],message['color'],message['bgcolor']); //turn LED on or off, for now we will just show it in console.log
      //matrix.clear();
      //console.log("Done + Cleared?")
    }else{
      matrix.clear();
    }
  });
  
  
  
  
});
