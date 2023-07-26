const DELAY = 3000;

const fetchAndAppendPokemon = async () => {
  const loading = document.getElementById("loading");
  const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

  loading.style.display = "block";
  const pokemonData = await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      setTimeout(() => {
        appendPokemon(res.results);
        loading.style.display = "none";
      }, DELAY);
    });
};

const appendPokemon = (pokemon) => {
  const wrapper = document.getElementById("pokemon-wrapper");

  pokemon.forEach((onePokemon) => {
    const pokemonDiv = document.createElement("p");
    pokemonDiv.innerText = onePokemon.name;
    wrapper.append(pokemonDiv);
  });
};

const addEventListeners = async () => {
  setTimeout(async () => {
    const button = document.getElementById("do-stuff");
    button.innerText += " ✅";
    button.addEventListener("click", await fetchAndAppendPokemon);
  }, DELAY);
};

addEventListeners();
