import express from "express";

const app = express();
const port = process.env.PORT || 1234;

app.get("/", (req, res) => {
  console.log("sa");
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
