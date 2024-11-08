import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.get('/', (req, res) => {
  res.send({ message: 'hello' });
});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
