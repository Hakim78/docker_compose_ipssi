const http = require('http');  
const app = require('./app.js');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);  

// gestion des erreurs du serveur
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
        
    // Ajout des cas d'erreur manquants
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}); 

// Événement lorsque le serveur commence à écouter
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

// Démarrage du serveur
server.listen(port);