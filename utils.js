function encryptMessage(message, key) {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
}
