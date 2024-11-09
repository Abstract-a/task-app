import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//create a book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// Get all books

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a sing le book

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update a book

router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .send({ message: 'Send all fields title, author, publishYear' });
    }
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      res.status(404).send({ message: ' Book not found' });
    }
    res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete a book

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      res.status(404).send({ message: ' Book not found' });
    }
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
