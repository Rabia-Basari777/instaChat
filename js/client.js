const socket = io();

const form = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");
let audio = new Audio('t2.mp3');


const showNewUser = (message, position) => {               
    const msgElement = document.createElement("div");
    msgElement.innerText = message;
    msgElement.classList.add("message");
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
    audio.play();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    showNewUser(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})

const name = prompt("Enter your name to join");   // A prompt pop-up will appear the moment the app is opened.
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    showNewUser(`${name} joined the chat`, 'right');     // shows a message saying a user has joined the chat.
})

socket.on("receive", data => {
    showNewUser(`${data.name}: ${data.message}`, 'left');  // Displays the message sent by other users in the group on the left side.
})

socket.on("left", name => {
    showNewUser(`${name} left the chat`, 'left');   // Displays if a particular user has left the chat.
})