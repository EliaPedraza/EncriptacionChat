const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const secretKey = 'clave_secreta'; // Clave secreta para encriptar y desencriptar mensajes

// Establece la conexión WebSocket
const ws = new WebSocket('ws://localhost:8080');

// Evento click del botón de enviar mensaje
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        const encryptedMessage = encryptMessage(message, secretKey);
        console.log("Mensaje encriptado enviado:", encryptedMessage); // Muestra el mensaje encriptado en la consola
        ws.send(encryptedMessage); // Envía el mensaje encriptado a través del WebSocket
        displayMessage(message, true); // Muestra el mensaje enviado por el usuario
        messageInput.value = '';
    }
});

// Maneja el evento de recepción de mensajes
ws.addEventListener('message', (event) => {
    const encryptedMessage = event.data;
    const message = decryptMessage(encryptedMessage, secretKey);
    displayMessage(message, false); // Muestra el mensaje recibido del servidor
});

// Función para encriptar un mensaje usando AES
function encryptMessage(message, key) {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
}

// Función para desencriptar un mensaje usando AES
function decryptMessage(encryptedMessage, key) {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

// Función para mostrar mensajes en el chat
function displayMessage(message, isUser) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    
    // Agrega una clase de estilo diferente según si el mensaje es del usuario o del servidor
    messageElement.classList.add(isUser ? 'user-message' : 'server-message');
    messageElement.innerText = message;
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
