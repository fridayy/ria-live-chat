/*
* websockets client connecting to the swsc server
* located on localhost port 8080
* protocol name: swscp
* author: Krenn Benjamin
*/
window.onload = function() {
    //Open connection
    var websocket = new WebSocket("ws://localhost:8080", "swscp");
    var message = document.getElementById("chat-text");
    var button = document.getElementById("send");


    websocket.onopen = function() {
        console.log("connection establised.");
        document.getElementById("log").innerHTML = "connection establised";
        button.addEventListener("click", function() {
            var selectedFile = document.getElementById('file').files[0];

            var reader = new FileReader()

            reader.addEventListener("load", function () {
                var json = {
                    type : "image",
                    content : reader.result
                }
                websocket.send(JSON.stringify(json));
                document.getElementById('fileupload').reset();
            }, false);


            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            } else {
                var json = {
                    type : "text",
                    content : message.value
                }

                websocket.send(JSON.stringify(json));
                message.value = "";
            }
        });
    }
    websocket.onmessage = function(event) {
        var parsedJson = JSON.parse(event.data);
        if(parsedJson.type === "text") {
            createChatNode("[" + (new Date()).toUTCString() + "] Anonymous wrote: " + parsedJson.content);
        } else if(parsedJson.type === "image") {
            createChatNode("[" + (new Date()).toUTCString() + "] Anonymous wrote: ");
            var img = document.createElement("img");
            img.src = parsedJson.content
            img.height = 200
            chatbox.appendChild(img);
        }
    }
}

function createChatNode(message) {
        var chatbox = document.getElementById("chatbox");
        var para = document.createElement('p');
        var text = document.createTextNode(message);
        para.appendChild(text);
        chatbox.appendChild(para);
}

