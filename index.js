import connectToMongo from "./database/db.js";
import express from "express";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import cors from "cors";

connectToMongo();

const app = express();
const port = 4000;

// middelwares
app.use(express.json());
app.use(cors());

// Availabel Routes

app.get('/', (req, res)=>{
  res.json("eNoteBook Backend API")
})

app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
