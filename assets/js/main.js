let offset = 0
const limit = 10
const maxRecords = 151
const pokemons = []

const modal = document.getElementById('modal')
const loadMoreButton = document.getElementById('load-more')

const loadPokemonItems = (offset, limit) => {
    pokeapi.getPokemons(offset, limit)
    .then((pokemonList = []) => document.getElementById('pokemon-list').innerHTML += 
        pokemonList.map(pokemon => `
            <li class="pokemon ${pokemon.type}">
                <span class="number" onclick="loadPokemonModal(event)">#${pokemon.id}</span>
                <span class="name" onclick="loadPokemonModal(event)">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join(''))
    .catch(error => console.log(error))
}

const loadPokemonModal = (event) => {
    const id = event.target.parentElement.firstElementChild.innerHTML.replace('#','')
    const pokemon = pokemons.find(pokemon => pokemon.id == id)
    const maleHtml = '<img src="/assets/img/icon-male.png" alt="male icon"/>'
    const femaleHtml = '<img src="/assets/img/icon-female.png" alt="female icon"/>'

    pokeapi.getPokemonSpeciesDetails(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
    .then(resp => {
        modal.innerHTML = `<section class="modal-content ${pokemon.type}">   
            <div class="modal-float-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}-image">
            </div>
            
            <article class="modal-pokemon">
                <div class="modal-pokemon-header">
                    <ol>
                        <li onclick="modal.style.display = 'none'"><img src="/assets/img/icon-left.png" alt="go back"/></li>
                        <li><img src="/assets/img/icon-like.png" alt="like"/></li>
                    </ol>
                </div>

                <div class="modal-pokemon-info">
                    <div class="modal-pokemon-info-title">
                        <h1>${pokemon.name}</h1>
                        <div class="modal-pokemon-info-title-types">
                            <ol>
                                ${pokemon.types.map(type => `<li class="modal-pokemon-type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                    </div>

                    <div class="modal-pokemon-id">
                        <span class="number">#${pokemon.id}</span>
                    </div>
                </div>
            </article>

            <article class="modal-pokemon-habilities">
                    <ol class="modal-pokemon-habilities-menu">
                        <li class="modal-menu-active">About</li>
                        <li class="modal-color-gray">Base Stats</li>
                        <li class="modal-color-gray">Evolution</li>
                        <li class="modal-color-gray">Moves</li>
                    </ol>

                    <div class="modal-pokemon-habilities-about">
                        <ol>
                            <li><span class="modal-color-gray">Habitat</span> <span>${resp.habitat.name}</span></li>
                            <li><span class="modal-color-gray">Heigth</span> <span class="modal-span-normal-text">${pokemon.height * 10} cm</span></li>
                            <li><span class="modal-color-gray">Weight</span> <span class="modal-span-normal-text">${pokemon.weight / 10} kg</span></li>
                            <li><span class="modal-color-gray">Abilities</span> <span>${pokemon.abilities.map(ability => `${ability}`).join(', ')}</span></li>
                        </ol>

                        <h4>Breeding</h4>

                        <ol>
                            <li>
                                <span class="modal-color-gray">Gender</span> 
                                <span>
                                    ${resp.gender_rate > -1 ? 
                                        maleHtml + (100 - (resp.gender_rate / 8) * 100) + "%" 
                                        + '<span class="modal-span-margin-left">' + femaleHtml + ((resp.gender_rate / 8) * 100) + "%" + "</span>" 
                                        : maleHtml + "100 %"
                                    }
                                </span>
                            </li>
                            <li><span class="modal-color-gray">Egg Groups</span> <span>${resp.egg_groups.map(egg_group => `${egg_group.name}`).join(', ')}</span></li>
                        </ol>
                    </div>
            </article>
        </section>`
        
        modal.style.display = 'block'
    })
    .catch(error => console.log(error))
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += 10
    const nextPageRecords = offset + limit

    if (nextPageRecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return
    }

    loadPokemonItems(offset, limit)
})
