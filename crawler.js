const unirest = require("unirest");
const cheerio = require("cheerio");
const db = require("./db");

const getNewsData = async () => {
  return unirest
    .get("https://www.google.com/search?q=football&gl=us&tbm=nws")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);
      let news = {};
      $(".SoaBEf").each(async (i, el) => {
        news = {
          link: $(el).find("a").attr("href"),
          title: $(el).find("div.n0jPhd").text(),
          snippet: $(el).find(".GI74Re").text(),
          //  date: $(el).find(".OSrXXb span").text(),
          thumbnail: $(el).find(".uhHOwf img").attr("src"),
        };
        // push data to db
        try {
          const link = news.link,
            title = news.title,
            thumbnail = news.thumbnail;
          let snippet = news.snippet.replace(/'/g, "");
          console.log(snippet);
          const result = await db.query(
            `Insert into articles(link, title, snippet, thumbnail)
            values(
              '${link}','${title}','${snippet}','${thumbnail}'
            )`
          );
        } catch (error) {
          throw Error(error);
        }
      });
    });
};

module.exports = {
  getNewsData,
};
