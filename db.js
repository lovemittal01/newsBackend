const mysql = require("mysql2/promise");
let config = {
  host: "wyr-news-crawler.cksx8naxczba.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "GILtNyHIzx",
  database: "news",
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
