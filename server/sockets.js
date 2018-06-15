const prodModel = require ('./models/prodModel');
const unitModel = require ('./models/unitModel');
const userModel = require ('./models/userModel');

const xlsx = require('xlsx');

module.exports = io => {
    io.on('connection', socket => {
        console.log(`user connected, referer: ${socket.handshake.headers.referer}`);

        // Создание товарной позиции
        socket.on('prodCreate', data => {
            prodModel.create({
                article: data.article,
                article1s: data.article1s,
                name: data.name,
                barcode: data.barcode,
                unit: data.unit
            }, (err, result) => {
                if (err) return console.error('prodModel', err);
                console.log(`saved successfully...`);
                socket.emit('saveResultMessage', 'Артикул добавлен в базу');
                io.emit('updData');
            });
        });

        // Обновление товарной позиции
        socket.on('prodUpdate', data => {
            prodModel.where({_id: data.id}.updateOne({ $set: {
                article: data.article,
                article1s: data.article1s,
                name: data.name,
                barcode: data.barcode,
                unit: data.unit
            }}).exec((err, result) => {
                if (err) return console.error('prodModel', err);
                console.log(`saved successfully...`);
                socket.emit('saveResultMessage', 'Изменения сохранены');
                io.emit('updData');
            }));
        });

        // Чтение товарных позиций из базы
        socket.on('readData', () => {
            prodModel.find().exec((err, result) => {
                if (err) return console.error('prodModel', err);
                console.log(`reading successfully...`);
                socket.emit('readData', result);
            });
        });
        // Удаление товарной позиции
        socket.on('delItem', id => {
            prodModel.deleteOne({_id: id}, err => {
                if (err) return console.error('delItem from prodModel', err);
                socket.emit('delResultMessage', 'Артикул удален из базы');
                io.emit('updData');
            });
        });
        // Тест работы сокета
        socket.on('addItem', err => {
            if (err) return console.error('addItem from prodModel', err);
            console.log('socket addItem from client');
            io.emit('addItem', example);
        });

        socket.on('pingServer', function (message) {
            console.log(message);
            socket.emit('messageChannel', 'sendOK');
        });
        // Тест запроса страницы из сервера
        socket.on('reqTest', val => {
            console.log(val);
        });

        // Сокеты для работы с заказами
        socket.on('file loaded', function (file) {
            let workbook = xlsx.read(file, {type: 'binary'});
            let sheets = workbook.SheetNames;
            let cells = [];
            sheets.forEach(function (currentSheet) { /* проход по листам файла */
                let worksheet = workbook.Sheets[currentSheet];
                // в каждом листе проход по заполненым ячейкам;
                for (let key in worksheet) {
                    /* игнорирование ячеек. которые содержат ! или пустые */
                    if (key[0] === '!' || worksheet[key].v === '') continue;
                    cells.push(getCells(key, worksheet[key].v));
                }
            });
            socket.emit('file parsed', cells);
        });
        socket.on('file save', function (table) {
            console.log(table);
        });
    });
};

function getCells(cell, value) {
    // Парсинг адресов ячеек
    let col = '', row = '';
    for (let char of cell) {
        if (isNaN(+char)) {
            col += char;
        } else {
            row += char;
        }
    }
    return ({col: col, row: +row, value: value});
}