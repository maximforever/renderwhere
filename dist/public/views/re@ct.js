console.log("Ey, it's me, your buddy Re@ct");

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
  loadingDiv.src = "assets/loading.gif";

  heading.innerText = "Client side rendering";
  subheading.innerText = "The following numbers were generated on the server";

  root.appendChild(heading);
  root.appendChild(subheading);
  root.appendChild(loadingDiv);
  root.appendChild(wrapperDiv);
  wrapperDiv.appendChild(innerDiv);

  await fetchAndAppendPokemon(innerDiv, loadingDiv);
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
