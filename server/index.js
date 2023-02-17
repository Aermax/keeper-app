import express from "express";
import cors from "cors"
import mongoose from "mongoose";
mongoose.set('strictQuery', false);
import * as dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGODB_URI, () => console.log("mongodb connected"))

//Mongoose Schema and Model Creation
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Note = mongoose.model('Note', noteSchema)



const app = express();
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {

    try {
        const notes = await Note.find({})
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }


})

app.post("/", (req, res) => {
    try {
        const { title, content } = req.body

        const note = Note.create({
            title: title,
            content: content
        })
        res.status(200).json({ success: true, data: note });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error" });
    }



})

app.delete("/", (req, res) => {
    try {
        Note.findByIdAndRemove(req.body._id, (err, item) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Item successfully deleted",
                _id: item._id
            };
            return res.status(200).send(response);
        });
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 3000, () => console.log("Server Started"))