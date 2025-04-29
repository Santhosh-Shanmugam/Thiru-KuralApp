import express from "express";
import { Book } from '../models/bookmodel.js';
const router = express.Router();

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Apply authentication middleware to all routes
router.use(authenticateUser);

router.post("/create", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    // Validate input fields
    if (!title || !author || !publishYear) {
      return res.status(400).json({ 
        message: "All fields are required: title, author, publishYear" 
      });
    }

    // Validate input lengths
    if (title.length < 2 || title.length > 100) {
      return res.status(400).json({
        message: "Title must be between 2 and 100 characters"
      });
    }

    if (author.length < 2 || author.length > 50) {
      return res.status(400).json({
        message: "Author name must be between 2 and 50 characters"
      });
    }

    // Validate publishYear is a number and within reasonable range
    const year = parseInt(publishYear);
    if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
      return res.status(400).json({
        message: "Please provide a valid publish year between 1800 and current year"
      });
    }

    // Sanitize inputs
    const sanitizedTitle = title.trim();
    const sanitizedAuthor = author.trim();

    const userId = req.user._id;

    // Check if book already exists
    const existingBook = await Book.findOne({ 
      title: sanitizedTitle,
      author: sanitizedAuthor,
      userId
    });

    if (existingBook) {
      return res.status(409).json({
        message: "This book already exists in your collection"
      });
    }

    const newBook = await Book.create({
      title: sanitizedTitle,
      author: sanitizedAuthor,
      publishYear: year,
      userId,
    });

    return res.status(201).json({
      message: "Book created successfully",
      data: newBook
    });
    
  } catch (err) {
    console.error("Error creating book:", err);
    return res.status(500).json({ 
      message: err.message || "Internal Server Error" 
    });
  }
});

router.get('/tasks', async (req,res) => {
  try {
    // Filter books by userId
    const books = await Book.find({ userId: req.user._id });
    return res.status(200).json(books);
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});

router.get('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ 
      _id: id,
      userId: req.user._id 
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
});

router.put('/edit/:id', async (req,res) => {
  try {
    const { title, author, publishYear } = req.body;
    
    // Add same validation as create route
    if (!title || !author || !publishYear) {
      return res.status(400).json({ 
        message: "All fields are required: title, author, publishYear" 
      });
    }

    if (title.length < 2 || title.length > 100) {
      return res.status(400).json({
        message: "Title must be between 2 and 100 characters"
      });
    }

    if (author.length < 2 || author.length > 50) {
      return res.status(400).json({
        message: "Author name must be between 2 and 50 characters"
      });
    }

    const year = parseInt(publishYear);
    if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
      return res.status(400).json({
        message: "Please provide a valid publish year between 1800 and current year"
      });
    }

    const { id } = req.params;
    
    const result = await Book.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { 
        title: title.trim(),
        author: author.trim(),
        publishYear
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    return res.status(200).json({ 
      message: 'Book updated successfully',
      data: result
    });

  } catch(err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const result = await Book.findOneAndDelete({ 
      _id: id,
      userId: req.user._id 
    });

    if (!result) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }
    
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch(err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;


