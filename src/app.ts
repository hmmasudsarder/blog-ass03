import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/Error/notFound';
import router from './app/router';
import globalErrorHandler from './app/Error/globalErrorHandler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use(cookieParser());



// application routes
app.use('/api', router);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello Verson2.0 In Bangladesh!');
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
