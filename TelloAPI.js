/*

	Rzye Tello

	http://www.ryzerobotics.com

*/

var dataToTrack_keys = ["battery", "x", "y", "z", "speed"];
var lastDataReceived = null;


var http = require('http');
var fs = require('fs');
var url = require('url');


var PORT = 8889;
var HOST = '192.168.10.1';

var dgram = require('dgram');
var client = dgram.createSocket('udp4'); 

client.bind(8001);

var hResp1 = 'hResp1 not set. \n' ;
var hResp2 = ' - hResp2 not set. \n' ;

http.createServer( function (request, response) {  

    var pathname = url.parse(request.url).pathname;
       
    var url_params = request.url.split('/');

    if (url_params.length < 2)
        return;

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

        case 'command':
			var message = new Buffer('command');
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});

			console.log('command received.');
			hResp1 = 'command 00 received. \n' ; 
		break;			
		
        case 'takeoff':
			console.log('takeoff');
			hResp1 = 'takeoff 00 received. \n' ;
			TakeoffRequest();
		break;
		
        case 'land':
			console.log('land');
			hResp1 = 'land 00 received. \n' ;
			LandRequest();
		break;
		
        case 'up':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('up ' + dis);
			hResp1 = 'up ' + dis + ' received. \n' ;
			var message = new Buffer( 'up '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

        case 'down':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('down ' + dis);
			hResp1 = 'down ' + dis + ' received. \n' ;
			var message = new Buffer( 'down '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;

        case 'left':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('left ' + dis);
			hResp1 = 'left ' + dis + ' received. \n' ;
			var message = new Buffer( 'left '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

        case 'right':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('right ' + dis);
			hResp1 = 'right ' + dis + ' received. \n' ;
			var message = new Buffer( 'right '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;		
		
		case 'forward':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('forward ' + dis);
			hResp1 = 'forward ' + dis + ' received. \n' ;
			var message = new Buffer( 'forward '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;		
		
        case 'back':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('back ' + dis);
			hResp1 = 'back ' + dis + ' received. \n' ;
			var message = new Buffer( 'back '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;

        case 'cw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('cw ' + dis);
			hResp1 = 'cw ' + dis + ' received. \n' ;
			var message = new Buffer( 'cw '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});								
		break;

		case 'flip':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('flip' + dis);
			hResp1 = 'flip' + dis + ' received. \n' ;
			var message = new Buffer( 'flip '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'ccw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('ccw ' + dis);
			hResp1 = 'ccw ' + dis + ' received. \n' ;
			var message = new Buffer( 'ccw '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;	
			});							
		break;						

		case 'battery?':
			console.log('battery?');
			hResp1 = 'battery? 00 received. \n' ;
			var message = new Buffer( 'battery?');
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'time?':
			console.log('time?');
			hResp1 = 'time? 00 received. \n' ;
			var message = new Buffer( 'time?');
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;		
			
	  }

	response.write('r w \n'); 
	var showtime = Date.now() ; 		
			client.on('message',function(msg,info){
				console.log('Data received from drone : ' + msg.toString());
				console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
				hResp2 = ' - Drone says : ' + msg.toString() + ' ' + msg.length + ' ' + showtime;
			});	
	response.end(hResp1 + hResp2);
   
}).listen(8001);


console.log('---------------------------------------------------');
console.log('Tello Server running at http://127.0.0.1:8001/');
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

function TakeoffRequest(){
	
	var message = new Buffer('command');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
	var message = new Buffer('takeoff');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;

	});
}

function LandRequest(){

	var message = new Buffer('land');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
}

