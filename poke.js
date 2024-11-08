
const searchInput = document.getElementById('search')
const pokemonsContainer = document.getElementById('pokemons');



async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=250'); // Limita a 250 Pokémon
        const data = await response.json();
        displayPokemons(data.results);
        console.log(data)
    } catch (error) {
        console.error('Error al obtener los datos de los Pokémon:', error);
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
    }
}

async function displayPokemons(pokemonList) {
    pokemonsContainer.innerHTML = ''; // Limpiar el contenedor
    const pokemonCard = await Promise.all(pokemonList.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.url);
            //se utiliza tmpley strings para tener html y java script
            return`
            <tr>
                <td>${details.id}</td>
                <td><img src="${details.sprites.front_default}" alt="${pokemon.name} class="img-fluid"></td>
                <td>${pokemon.name}</td>
                <td>${details.types.map(typeInfo => typeInfo.type.name).join('/')}</td>
                <td>${details.height / 10} m</td> <!-- Altura en metros -->
                <td>${details.weight / 10} kg</td> <!-- Peso  -->
            </tr>
            `;
    }));
    pokemonsContainer.innerHTML = pokemonCard.join('');
}


searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase()

    if (totalPokemon.length > 0) { // para verificar que taltalPokemon no esta vacia
        const filteredPokemon = totalPokemon.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm) || pokemon.id.toString().includes(searchTerm)
        );
        displayPokemons(filteredPokemon);
    }
});
console.log(searchInput)

// Inicializa la Pokedex

fetchPokemons()
        