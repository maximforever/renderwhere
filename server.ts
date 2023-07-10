import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const axios = require('axios');                 // make http requests
const bodyParser = require("body-parser");      // parse request body
const path = require("path");                   // access paths
const app: Express = express();

app.use(express.static(path.join(__dirname, "/public/")));
const port = process.env.PORT;

app.use(function (req, res, next) {
  // logs request URL
  var date = new Date();
  console.log(`==> ${req.method.toUpperCase()} ${req.url} on ${date}`);
  next();
});


app.get('/', (req: Request, res: Response) => {
  res.send(indexHTML());
});

app.get('/ssr', (req: Request, res: Response) => {
  // res.send('<div>Hello World!<div>');
  //res.sendFile(__dirname + '/public/views/index.html');
  res.send(serverSideRenderedPage());
});

app.get('/csr', (req: Request, res: Response) => {
  res.send(clientSideRenderedPage());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

type PokemonResult = {
  name: string,
  url: string
}

type pokemonAPIresponse = {
  count:  number,
  next: string | null,
  previous: string | null,
  results: PokemonResult[],
}


function indexHTML(){
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
      </html>`

      return html;
}

function clientSideRenderedPage(){
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
      </html>`

      return html;
}

function serverSideRenderedPage(){
      console.log("responding");
      const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
      // axios.get(url, {
      //   headers: {
      //     Accept: 'application/json',
      //   },
      // },)
      //   .then((res: {data: pokemonAPIresponse}) => res.data)
      //   .then((data: pokemonAPIresponse)  => {
      //     console.log(data);
      //     const pokemonData = data.results.map((pokemon: PokemonResult) => `<p>${pokemon.name}</p>`)



      //     console.log(html)

      //     return html;
      //   })
      //   .catch(err => console.log(err))

      const randomNumbers = new Array(10).fill("a").map((el) => {
        return `<p>${Math.floor(Math.random() * 1000)}</p>`
      })

      const randomNumberHTML = randomNumbers.join("");

      const html = `<html>
        <head>
          <title>Renderwhere</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="views/stylesheet.css">
          <link rel="icon" href="assets/icon.png" />
        </head>
        <body>
          <div>Hello World!<div>
          <div>Here are some random numbers: </div>
          ${randomNumberHTML}
          <script src="views/script.js"></script>
        </body>
      </html>`

      return html;
}