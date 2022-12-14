const socket = io('https://chatappbackendindia.herokuapp.com');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('pop.wav');


const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message); //
    messageInput.value = '' //to blank the chat box
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} has joined the chat`, 'right')
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name}: left the chat`, 'left')
})