import express, { response } from "express";
import {PORT, mongoURL} from "./config.js"
import mongoose from "mongoose"
import { book } from "./models/bookModel.js";
import booksRouter  from "./routes/booksRoutes.js";
import cors from "cors"

const app = express();

// middleware to parse json request
app.use(express.json())

// middleware to handle cors policy
app.use(cors())
// app.use(cors
//     ({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

// home route
app.get("/", (resquest, response) => {
    // console.log(resquest)
    return response.status(234).send("Hello World!")
});

app.use("/books", booksRouter)

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("Connected to database!")

        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });