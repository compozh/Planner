const mongoose = require('mongoose');

module.exports = startServer => {
    const connectDb = () => {
        mongoose.connect('mongodb://localhost/planner')
            .then(() => console.log('MongoDB has started ...'))
            .catch(err => console.log(err.name + ': ' + err.message));
        return mongoose.connection;
    };

    connectDb()
        .on('error', console.log)
        .on('disconnected', connectDb)
        .once('open', startServer);
};

