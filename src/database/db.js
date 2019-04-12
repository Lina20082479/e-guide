import mongoose from 'mongoose';
import env from './../env';
import autoIncrement from "mongoose-auto-increment";

mongoose.connect(env.DB_URL, { useNewUrlParser: true });

autoIncrement.initialize(mongoose.connection);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + env.DB_URL);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

export default mongoose;