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

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    showNewUser(`${name} joined the chat`, 'right');
})

socket.on("receive", data => {
    showNewUser(`${data.name}: ${data.message}`, 'left');
})

socket.on("left", name => {
    showNewUser(`${name} left the chat`, 'left');
})