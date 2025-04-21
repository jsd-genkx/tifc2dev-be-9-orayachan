const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    const { genre } = req.query;
    //TODO: ADD CODE HERE ⬇️ to Filter books by genre.
    if (genre) {
      const filteredBooks = books.filter((book) => book.genre.includes(genre));
      res.json(filteredBooks);
    } else {
      res.json(books);
    }
  }, 1000); // Simulate a 1-second delay
});

// GET specific book by ID with async/await
// SetTimeout is asynchronous, but the code inside is synchronous.
// That's why there is no try.. catch...
// Simulate asynchronus operation
app.get("/books/:id", async (req, res, next) => {
  try {
    const book = await new Promise((resolve, reject) => {
      // setTimeout(() => {
      const foundBook = books.find((b) => b.id === parseInt(req.params.id, 10));
      if (foundBook) {
        resolve(foundBook);
      } else {
        //TODO: ADD CODE to reject the promise
        reject(new Error("Book not found"));
      }
      // }, 1000); // Simulate a 1-second delay
    });
    res.json(book);
  } catch (err) {
    err.status = 404;
    next(err);
  }
});

// Middleware to handle 404 errors
//TODO: ADD CODE HERE ⬇️
app.use((err, res, next) => {
  const error = new Error("Not Found");
  err.status = 404;
  next(error);
});

// General error handling middleware
//TODO: ADD CODE HERE ⬇️
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const response = {
    message: err.message || "Internal Server Error",
    status: status,
  };
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
