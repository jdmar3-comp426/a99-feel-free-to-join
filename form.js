//const { userInfo } = require("os");

window.addEventListener( "load", function () {
    function sendData() {
        console.log('sending data');
        const XHR = new XMLHttpRequest(),
              FD = new URLSearchParams(new FormData( form ));

              XHR.addEventListener('error', function(event) {
                alert('Something went wrong...');
            });

            XHR.addEventListener('load', function(event) {
                alert('Data was sent and response loaded.');
            });

              XHR.open("POST", "http://localhost:5000/app/new/user" );
              XHR.send( FD );
    }
    
    const form = document.getElementById( "signup" );

    form.addEventListener( "submit", function (event) {
        event.preventDefault(); 
        // if user doesnt exist..  
        sendData();
        // else, login to existing user
    });
});