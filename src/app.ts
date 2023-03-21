import express from 'express';
import errorHandler from './app/middleware/error-handler.middleware';
import lessonRouter from './routes/lesson-route';
import magazineRouter from './routes/magazine-route';


const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(magazineRouter);
server.use(lessonRouter);

server.use(errorHandler);


server.listen(3000, () => {
    console.log('Server running');
});