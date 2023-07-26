"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios = require("axios"); // make http requests
const bodyParser = require("body-parser"); // parse request body
const path = require("path"); // access paths
const app = (0, express_1.default)();
app.use(express_1.default.static(path.join(__dirname, "/public/")));
const port = process.env.PORT;
app.use(function (req, res, next) {
    // logs request URL
    var date = new Date();
    console.log(`==> ${req.method.toUpperCase()} ${req.url} on ${date}`);
    next();
});
app.get("/", (req, res) => {
    res.send(indexHTML());
});
app.get("/ssr", async (req, res) => {
    // res.send('<div>Hello World!<div>');
    //res.sendFile(__dirname + '/public/views/index.html');
    const ssrPage = await serverSideRenderedPage();
    res.send(ssrPage);
});
app.get("/csr", (req, res) => {
    console.log("CLIENT SIDE");
    res.send(clientSideRenderedPage());
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
function indexHTML() {
    const html = `<html>
        <head>
          <title>Renderwhere</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="views/stylesheet.css">
          <link rel="icon" href="assets/icon.png" />
        </head>
        <body>
          <a href='/ssr'>Server-side rendering</a>
          <br/>
          <br/>
          <a href='/csr'>Client-side rendering</a>
          <script src="views/script.js"></script>
        </body>
      </html>`;
    return html;
}
function clientSideRenderedPage() {
    const html = `<html>
        <head>
          <title>Renderwhere</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="views/stylesheet.css">
          <link rel="icon" href="assets/icon.png" />
        </head>
        <body>
          <div id="root">
          <script src="views/re@ct.js"></script>
        </body>
      </html>`;
    return html;
}
async function getPokemon() {
    console.log("responding");
    const url = "https://pokeapi.co/api/v2/pokemon?limit=150";
    const { data } = await axios.get(url, {
        headers: {
            Accept: "application/json",
        },
    });
    console.log(data);
    const pokemonData = data.results
        .map((pokemon) => `<p>${pokemon.name}</p>`)
        .join("");
    return pokemonData;
    //should handle errors here
}
async function serverSideRenderedPage() {
    const html = `<html>
        <head>
          <title>Renderwhere</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="views/stylesheet.css">
          <link rel="icon" href="assets/icon.png" />
        </head>
        <body>
          <h1>Server side rendering<h1>
          <h3>The following numbers were generated on the server</h3>
          <div>Here are some pokemon: </div>
          ${await getPokemon()}
          <script src="views/script.js"></script>
        </body>
      </html>`;
    return html;
}
