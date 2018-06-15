const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Передача приложения в файл routes.js для обработки маршрутов
require('./router')(app);
// Передача экземпляра socket.io в мудуль работи с сокетами
require('./sockets')(io);
// Передача параметров запуска сервера для предварительного подключения к БД
require('./db')(startServer);

// Функция для запуска сервера
function startServer () {
    const port = 3000;
    server.listen(port);
    console.log(`Сервер запущен на порту ${port}`);
}


