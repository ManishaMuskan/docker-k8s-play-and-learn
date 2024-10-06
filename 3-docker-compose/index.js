const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis_server", // Putting this  from docker-compose.yml file in place of connection url to make network connection
  //   it will be parsed by docker-cli and will be redirected to redis_server running in the different container
  port: 6379, //default port
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.status(200).send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});
