const pokeapi = {}

pokeapi.getPokemons = (offset = 0, limit = 5) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(json => json.results)
            .then(results => results.map(pokeapi.getPokemonDetails))
            .then(requests => Promise.all(requests))
            .then(pokemonWithDetails => pokemonWithDetails)
            .catch(error => console.error(error))
}

pokeapi.getPokemonDetails = pokemon => fetch(pokemon.url)
    .then(response => response.json())
    .then(json => {
        const pokemon = new Pokemon(json) 
        pokemons.push(pokemon)
        return pokemon
    })

pokeapi.getPokemonSpeciesDetails = url => {
    return fetch(url)
    .then(response => response.json())
    .then(json => json)
}