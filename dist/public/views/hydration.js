const DELAY = 6000;
const SHORT_DELAY = 2000;

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
      }, SHORT_DELAY);
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
  const button = document.getElementById("do-stuff");
  button.innerText += " ✅";
  button.addEventListener("click", await fetchAndAppendPokemon);
};

const makePikachuBouncy = () => {
  const pikachu = document.getElementById("pikachu");
  console.log(pikachu);
  pikachu.classList.add("bouncy");
};

const enableJavascript = () => {
  console.log("running!");
  setTimeout(() => {
    console.log("in setTimeout!");
    addEventListeners();
    makePikachuBouncy();
  }, DELAY);
};

enableJavascript();
