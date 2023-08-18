const express = require("express");
const db = require("./db");
const crawler = require("./crawler.js");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async function (req, res) {
  res.send({ message: "ok" });
});

app.post("/crawl-news", async function (req, res) {
  const result = await crawler.getNewsData();
  res.send({ message: "Crawled Successfully!" });
});

app.get("/get-news", async function (req, res) {
  let offset = req.query.page ? req.query.page * 10 : 0;
  const result = await db.query(
    `Select * from articles order by id desc limit 10 offset ${offset}`
  );
  res.send({ news: result });
});

app.listen(3001, console.log("Api is running on port 3000"));
