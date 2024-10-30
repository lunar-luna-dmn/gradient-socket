window.addEventListener('load', function() {
    //STEP 4 Client side socket connection
    //4.1 add script to index.html
    //4.2 Initialize socket and send request to the server to make socket connection
    let socket = io();
    //4.1 //Listen for confirmation of connection
    socket.on('connect', () => {
        console.log('Connected to server');
    });

//Define an array of customized colors
let fallPalette = [
    '#D9A782', //grey brown
    '#B34F05', //brown
    '#FD699F', //pink
    '#DFA6A3', //grey pink
    '#FFDB00', //bright yellow
    '#D5B807', //dull yellow
    '#B2D400', //bright green
    // '#93BF06', //dull green
    '#548602', //dark green
    '#FC840D', //bright orange
    // '#E38100', //dull orange
    '#BF4E47', //dark red
];

function randomColorFromPalette() {
    let randomIndex = Math.floor(Math.random() * fallPalette.length);
    return fallPalette[randomIndex];
}

document.body.addEventListener('click', function(event) {
    //STEP 5. Client side 'Emit' event on: send mouse data  to the server
    let mouseData = { x: event.clientX, y: event.clientY };
    socket.emit('myMouse', mouseData);
})

//STEP 8. Client side 'Emit' event: receive all mouse data from the server
socket.on('allMouse', (data) => { //Listen for an event named 'allMouse' from the server
    console.log("received all mouse data: ")
    console.log(data);

    //STEP 9. Draw gradients!
    //Draw a div every time mouse is clicked
    let ellipse = document.createElement('div');
    ellipse.classList.add('ellipse');

    // Set random size
    let size = Math.random() * 400 + 600; // Random size between 400 and 1000
    ellipse.style.width = `${size}px`;
    ellipse.style.height = `${size}px`;

    // Center the ellipse at the mouse click position
    ellipse.style.left = `${data.x - size / 2}px`;
    ellipse.style.top = `${data.y - size / 2}px`;

    // Create a radial gradient for the ellipse using the palette
    let color1 = randomColorFromPalette();
    let color2 = randomColorFromPalette();

    ellipse.style.background = `radial-gradient(closest-side, ${color1}, ${color2}, rgba(0, 0, 0, 0))`;
    // ellipse.style.background = `radial-gradient(closest-side, rgba(255, 0, 0, 1), rgba(0, 0, 0, 0))`;

    // // Create a random color radial gradient for the ellipse
    // ellipse.style.background = `radial-gradient(closest-side, rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, .8), rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, .4), rgba(0, 0, 0, 0))`;

    document.body.appendChild(ellipse);

    // Remove ellipse after a few seconds
    setTimeout(() => {
        ellipse.remove();
    }, 5000);

    }); //end of drawing elipses

    // // Function to generate random RGB values
    // function randomColor() {
    //     return Math.floor(Math.random() * 156 + 100);
    // };

})