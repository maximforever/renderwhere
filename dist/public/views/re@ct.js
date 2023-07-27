console.log("Ey, it's me, your buddy Re@ct");

const DELAY = 6000;

buildPage();

async function buildPage() {
  const root = document.getElementById("root");

  if (root === null) {
    throw new Error("Can't run re@act without a root");
  }

  const wrapperDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  const heading = document.createElement("h1");
  const subheading = document.createElement("h3");
  const loadingDiv = document.createElement("img");
  wrapperDiv.innerText = "Here are some pokemon:";

  loadingDiv.id = "loading";
  loadingDiv.style.display = "block";
  loadingDiv.src = "assets/loading.gif";

  heading.innerText = "Client side rendering";
  subheading.innerText =
    "Here are some pokemon we just fetched from an API client-side";

  root.appendChild(heading);
  root.appendChild(loadingDiv);

  // add setTimeout for delay
  setTimeout(async () => {
    await fetchAndAppendPokemon(innerDiv, loadingDiv);
    root.appendChild(subheading);
    root.appendChild(wrapperDiv);
    wrapperDiv.appendChild(innerDiv);
  }, DELAY);
}

async function fetchAndAppendPokemon(parentDiv, loadingDiv) {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

  const pokemonData = await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      res.results.forEach((pokemon) => {
        const pokemonDiv = document.createElement("p");
        pokemonDiv.innerText = pokemon.name;
        parentDiv.append(pokemonDiv);
      });
      loadingDiv.style.display = "none";
    });
}

const url = window.location.href;
console.log(url);
