import express from "express"
import { book } from "../models/bookModel.js"

const booksRouter = express.Router()

// route to add a new book to db
booksRouter.post("/", async (request, response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear)
        {
            return response.status(400).send({ message: "Bad input!!" })   
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const bookObj = await book.create(newBook)

        return response.status(201).send({ bookObj })
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// get all books
booksRouter.get("/", async(request, response) => {
    try{
        const allBooks = await book.find({})
        
        return response.status(200).send({
            count: allBooks.length,
            data: allBooks
        })
    }
    catch(error) {
        console.log(error.message)
        response.status(500).send( {message: error.message})
    }
})

//get a particular book
booksRouter.get("/:id", async(request, response) => {
    try{
        const { id } = request.params;

        const oneBook = await book.findById(id)
        
        return response.status(200).send(oneBook)
    }
    catch(error) {
        console.log(error.message)
        response.status(500).send( {message: error.message})
    }
})

//update a book
booksRouter.put("/:id", async (request, response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear)
        {
            return response.status(400).send({ message: "Bad input!!" })   
        }

        const { id } = request.params

        const result = await book.findByIdAndUpdate(id, request.body)

        if(result){
            return response.status(200).send({message: "Book updated sucessfuly"})
        }
        else{
            return response.status(404).send({message: "Book not found!!"})
        }

    }
    catch(error){
        console.log(error.message)
        response.status(500).send( {message: error.message}) 
    }
})

//delete a book
booksRouter.delete("/:id", async(request, response) => {
    try{
        const { id } = request.params;

        const result = await book.findByIdAndDelete(id)
        
        if(result){
            return response.status(200).send({message: "Book deleted sucessfuly"})
        }
        else{
            return response.status(404).send({message: "Book not found!!"})
        }
    }
    catch(error) {
        console.log(error.message)
        response.status(500).send( {message: error.message})
    }
})

export default booksRouter