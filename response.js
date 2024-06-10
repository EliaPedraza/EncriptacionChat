const responseInput = document.getElementById('response-input');
const respondButton = document.getElementById('respond-button');
const secretKey = 'clave_secreta';

const ws = new WebSocket('ws://localhost:8080'); // Reemplaza localhost:8080 con la dirección de tu servidor WebSocket

respondButton.addEventListener('click', () => {
    const message = responseInput.value.trim();
    if (message !== '') {
        const encryptedMessage = encryptMessage(message, secretKey);
        console.log("Mensaje encriptado enviado:", encryptedMessage); // Agrega este registro en la consola
        ws.send(encryptedMessage); // Envía el mensaje encriptado a través del WebSocket
        responseInput.value = '';
    }
});

ws.addEventListener('message', (event) => {
    const encryptedMessage = event.data;
    const message = decryptMessage(encryptedMessage, secretKey);
    displayMessage(message);
});

function encryptMessage(message, key) {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
}

function decryptMessage(encryptedMessage, key) {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

function displayMessage(message) {
    const responseBox = document.getElementById('response-box');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    responseBox.appendChild(messageElement);
    responseBox.scrollTop = responseBox.scrollHeight;
}
