const express = require('express');
const http = require('http');
const { CarritoAPI } = require('./models/index');
const socketIO = require('socket.io');
const routes = require('./routers/index');

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
const Carritos = new CarritoAPI();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//ROUTES
app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404);
    res.json({ error: -2, description: ` ruta ${req.url} metodo ${req.method} no implementado` });
});

//INICIANDO SERVIDOR
const myserver = httpServer.listen(PORT, () => {
    console.log(`SERVIDOR ACTIVO EN EL PUERTO ${PORT}`);
});
myserver.on('error', error => {
    console.log(`Error: ${error}`);
});