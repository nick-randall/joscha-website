const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 2315;

let creepers = [];
// const exampleCreeper = {
//     name: "example",
//     speed: 9,
//     explosionRadius : 10,
// }

// Allow all CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (_req, res) {
  console.log("hello world");
  res.send("Hello World!");
});

app.get("/get-number-of-pokemons", function (_req, res) {
  res.send(
    '<img style="width:300px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.natgeofe.com%2Fk%2F327b01e8-be2e-4694-9ae9-ae7837bd8aea%2Fmallard-male-swimming.jpg&f=1&nofb=1&ipt=f062895870a29f6d2661d26d962557125015d5b222874df3283b6d9bce786a47">'
  );
});

app.get("192.168.178.154:2315/add-new-creeper", function (req, res) {
  const creeper = {};
  creeper.name = req.query["creeper-name"];
  creeper.speed = req.query["speed"];
  creeper.explosion_radius = req.query["explosion-radius"];
  if (!creeper.name || !creeper.speed || !creeper.explosion_radius) {
    res.status(400);
    res.send("<h1>you forgot to add values<h1>");
    return;
  }
  creepers.push(creeper);
  console.log(creepers);
  res.status(200);
  res.send(
    "<h1>Creeper Succesfully Added!<h1> " +
      creepers.length +
      " <h4>creepers have been added<h4>"
      + "<br><a href='/get-all-creepers'>See All Creepers</a>"
  );
});

app.get("/get-all-creepers", function (_req, res) {
  let all_creepers = "<h1>All Creepers</h1><ul>";
  creepers.forEach((creeper) => {
    all_creepers += `<li>Name: ${creeper.name}, Speed: ${creeper.speed}, Explosion Radius: ${creeper.explosion_radius}</li>`;
  });
  all_creepers += "</ul>";
  res.send(all_creepers);
  });
app.get("/diamonds" , function (_req, res) {
  res.send("<button id='leftbutton'>left</button>");
  res.send("<button id='rightbutton'>right</button>");
  res.send("<script src='stuff.js'></script>")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



