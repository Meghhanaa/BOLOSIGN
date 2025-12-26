const express = require("express");
const { MongoClient } = require("mongodb");
const signPdfRoute = require("./routes/signPdf");

const app = express();
app.use(express.json({ limit: "10mb" }));

// MongoDB connection
const client = new MongoClient("mongodb://localhost:27017");
client.connect().then(() => {
  app.locals.db = client.db("boloforms");
  console.log("MongoDB connected");
});

// Routes
app.use("/sign-pdf", signPdfRoute);

app.listen(5000, () => {
  console.log("Backend running on 5000");
});
