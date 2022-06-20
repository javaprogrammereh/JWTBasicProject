const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const errorHandlerMiddleware  = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const connectDB = require('./config/db');
dotenv.config({path:"./config/config.env"});

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use(require('./routers/appRouter'));
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


const PORT = process.env.PORT || 3000;
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT,()=>{
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};
start();