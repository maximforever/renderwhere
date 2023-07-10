import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  // res.send('<div>Hello World!<div>');
  res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});