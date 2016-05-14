/*
* websockets client connecting to the swsc server
* located on localhost port 8080
* protocol name: swscp
* author: Krenn Benjamin
*/
window.onload = function() {
    //Open connection
    var websocket = new WebSocket("ws://127.0.0.1:8080", "swscp");
    var message = document.getElementById("chat-text");
    var button = document.getElementById("send");
    var chat = document.getElementById("chat");

    websocket.onopen = function() {
        console.log("connection establised.");
        document.getElementById("log").innerHTML = "connection establised";
        button.addEventListener("click", function() {
            websocket.send(message.value);
            message.value = "";
        });
    }
    websocket.onmessage = function(event) {
        console.log(event.data);
        chat.innerHTML += "[" + (new Date()).toUTCString() + "] Anonymous wrote: " + event.data + "<br>";
    }
}
