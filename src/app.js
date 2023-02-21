import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as dotenv from 'dotenv';
import {engine} from 'express-handlebars';
import loginRouter from "./routes/login.routes.js";
import signupRouter from "./routes/signup.routes.js";
import profileRouter from "./routes/profile.routes.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const app = express();

const connection_string = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.iimmmkt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

app.use(express.json());
app.use(cookieParser());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use(express.static('public'));
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);


app.use(session({
    store: MongoStore.create({
        mongoUrl: connection_string,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    ttl: 30,
}));

app.get('/', (req, res) => {
    res.send('hello world')
});

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

server.on("error", (err) => {
    console.error('Error:', err)
})

const enviroment = async () => {
    try {
        await mongoose.connect(connection_string)
        console.log('Connect to server')
    }catch (error) {
        console.log('Error:', error)
    }
}

enviroment()