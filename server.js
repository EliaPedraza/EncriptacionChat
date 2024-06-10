const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws) {
    console.log('Nuevo cliente conectado');

    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido:', message);
        // Aquí puedes enviar el mensaje a todos los clientes conectados, si lo deseas
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', function close() {
        console.log('Cliente desconectado');
    });
});
