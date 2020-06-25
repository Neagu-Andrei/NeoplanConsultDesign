/*
socketUrl = "";
if(document.location.href.indexOf("localhost") != -1){
  socketUrl = "http://127.0.0.1:"+port;
}
*/
const socket = io('http://localhost:8080');
socket.on('chat-message', data =>{
  console.log(data)
})
