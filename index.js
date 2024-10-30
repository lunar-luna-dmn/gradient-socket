//STEP 1: Client side set up
    // HTML, CS, JS

//STEP 2: Server side set up: Express and Socket.io
//2.1 Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//2.2 Initialize HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 2000;
server.listen(port, () => {
    console.log ("serve listening port: " + port);
});

//2.3 Initialize socket.io (Install socket.io via command line: npm install socket.io)
let io = require("socket.io"); //io is a larger socket world
io = new io.Server(server);

//STEP 3: Server side socket connection AKA Socket World!
io.on("connection", (socket) => { //3.1 Listen for a client to connect
    console.log("We have a new client: " + socket.id);
  
    //STEP 6. Server side 'On' event on socket: receive mouse data from each user
    //Listen for an event named 'myMouse' from client
    socket.on('myMouse', (data) => {
        console.log("myMouse:");
        console.log(data);

        //STEP 7. Server side 'On' event: share mouse data to all users
        io.emit('allMouse', data);
    });

    
  
    //Listen for this client to disconnect
    socket.on("disconnect", () => {
      console.log("A client has disconnected: " + socket.id);
    });
  });
  