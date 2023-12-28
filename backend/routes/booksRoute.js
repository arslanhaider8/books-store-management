import express from "express";
import { Book } from "../models/Booksmodel";

const router = express.Router();
//crout for new book
router.post(
  "/",
  async (request, response) => {
    try {
      if (!request.body.title || !request.body.author || !request.body.author) {
        return response.status(400).send({
          message: "send all reqired failed : title , author , published year ",
        });
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
    //try {
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishyear: request.body.publishyear,
    };

    const book = await Book.ceate(newBook);
    response.status(418).send(book);
    // } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
  //}
);

router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.legth,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.author) {
      return response.status(400).send({
        messae: "send all required fileds : title , author , publishyear",
      });
    }

    const { id } = request.params;
    const result = await Book.findbyIdandUpdate(id, request.body);
    if (!result) {
      return response.status(400).send({
        messae: " book not foundyear",
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
