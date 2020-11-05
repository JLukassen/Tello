/*

	Rzye Tello

	http://www.ryzerobotics.com     drone.bind(41234); drone.close(); response.write(hResp1 + hResp2); 

*/


var dataToTrack_keys = ["battery", "x", "y", "z", "speed"];
var lastDataReceived = null;


var http = require('http');
var fs = require('fs');
var url = require('url');


var PORT = 8889;
var HOST = '192.168.10.1';


var dgram = require('dgram'); 

var hResp1 = 'hResp1 not set. \n' ;
var hResp2 = ' - hResp2 not set. \n' ;

/*
A function is passed into the http.createServer() method as a parameter, 
and it is executed when someone tries to access the computer on port 8001. 
The port 8001 is specified in the 'listen' method invoked on the http
server object at the bottom: .listen(8001) 
*/

http.createServer( function (request, response) {  

    var pathname = url.parse(request.url).pathname;
       
    var url_params = request.url.split('/');

    if (url_params.length < 2) {
	hResp1 = 'url not correct. \n';
	hResp2 = ' - check split parameter. \n'; 
	}

    else {

    var drone = dgram.createSocket('udp4'); 

    var command = url_params[1];
	
	switch (command){
		
        case 'poll':
            respondToPoll(response);
            break;

        case 'testnode':
			console.log('Node test received.');
			console.log('Node OK.');
			hResp1 = 'Node test received. \n' ;
			hResp2 = ' - Node OK.' ;
		break;				
		
        case 'takeoff':
			console.log('takeoff');
			hResp1 = 'takeoff received. \n' ;
			var message = new Buffer('command');

	drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
	var message = new Buffer('takeoff');
	drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;

	});
		break;
		
        case 'land':
			console.log('land');
			hResp1 = 'land received. \n' ;
			var message = new Buffer('land');

	drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
		break;
		
        case 'up':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('up ' + dis);
			hResp1 = 'up ' + dis + ' received. \n' ;
			var message = new Buffer( 'up '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

        case 'down':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('down ' + dis);
			hResp1 = 'down ' + dis + ' received. \n' ;
			var message = new Buffer( 'down '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;

        case 'left':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('left ' + dis);
			hResp1 = 'left ' + dis + ' received. \n' ;
			var message = new Buffer( 'left '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

        case 'right':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('right ' + dis);
			hResp1 = 'right ' + dis + ' received. \n' ;
			var message = new Buffer( 'right '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;		
		
		case 'forward':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('forward ' + dis);
			hResp1 = 'forward ' + dis + ' received. \n' ;
			var message = new Buffer( 'forward '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;		
		
        case 'back':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('back ' + dis);
			hResp1 = 'back ' + dis + ' received. \n' ;
			var message = new Buffer( 'back '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;

        case 'cw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('cw ' + dis);
			hResp1 = 'cw ' + dis + ' received. \n' ;
			var message = new Buffer( 'cw '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});								
		break;

		case 'flip':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('flip' + dis);
			hResp1 = 'flip' + dis + ' received. \n' ;
			var message = new Buffer( 'flip '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'ccw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('ccw ' + dis);
			hResp1 = 'ccw ' + dis + ' received. \n' ;
			var message = new Buffer( 'ccw '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;	
			});							
		break;		
		
		case 'setspeed':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('setspeed ' + dis);
			var message = new Buffer( 'speed '+ dis );
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;				

		case 'battery?':
			console.log('battery?');
			var message = new Buffer( 'battery?');
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'time?':
			console.log('time?');
			var message = new Buffer( 'time?');
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'height?':
			console.log('height?');
			var message = new Buffer( 'height?');
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'temp?':
			console.log('temp?');
			var message = new Buffer( 'temp?');
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'baro?':
			console.log('baro?');
			var message = new Buffer( 'baro?');
			drone.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	
			
	  }
	response.write('r.w \n');
			var showtime = Date.now() ; 
			drone.on('message',function(msg,info){
				console.log('Data received from drone : ' + msg.toString());
				console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
				hResp2 = ' - Drone says : ' + msg.toString() + ' ' + msg.length + ' ' + showtime;
			});
	}
		
	response.end(hResp1 + hResp2);
       
}).listen(8001);


console.log('---------------------------------------------------');
console.log('Tello Scratch Ext running at http://127.0.0.1:8001/');
console.log('---------------------------------------------------');


function respondToPoll(response){

    var noDataReceived = false;

    var resp = "";
    var i;
    for (i = 0; i < dataToTrack_keys.length; i++){
        resp += dataToTrack_keys[i] + " ";
        resp += (i+10);
		resp += "\n";
    }
    response.end(resp);
}

