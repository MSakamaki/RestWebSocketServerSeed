
/* server define */
var  wsServer = require('websocket.io').listen(8080, function(){
	console.log('websocket server 8080 start');
});
var restServer = require('restify').createServer();
restServer.listen(8081, function() {
	console.log('listening at ', restServer.name, restServer.url);
});


/********************** WebSocket Server ******************************/
wsServer.on('connection', function(socket){
	console.log('websocket client server connect');
	/* server message event */
	socket.on('message', function(data) {
		console.log('client -> res msg:' + data);
		wsServer.clients.forEach(function(client){
			if(client){
				console.log('_ws send:', data);
				client.send(data);
			}
		});
	});
	/* server send event */
	wsMobile.send = function(fnc){fnc(socket);}
});

/************************  REST Server *******************************/
restServer.use(
	/* cross Origin Option */
	function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);


/* rest function */
var rPost = function(req,res,next){
	res.send(201,"post action!");
	return next();
}
var rSend = function(req,res,next){
	console.log('/get', req.params.XxxX);
	var param = req.params.XxxX;
	try{
		res.send(JSON.stringify({ p : param }));
	}catch(e){ 
		console.log('err:',e);
		res.send(JSON.stringify({err:"505 server error!"}));
	}
	//return next();
}

/* rest URI */
restServer.put('/get', rSend);
restServer.get('/get/:XxxX', rSend);
restServer.head('/get/:XxxX',rSend);
restServer.del('/get/:XxxX', rSend);
restServer.post('/hello', rPost);
