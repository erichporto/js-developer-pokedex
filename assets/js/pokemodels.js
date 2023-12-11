class Pokemon {
    id;
    name;
    types;
    type;
    photo;
    height;
    weight;
    abilities;

    constructor(pokemon_info) {
        this.id = pokemon_info.id
        this.name = pokemon_info.name
        this.types = pokemon_info.types.map(typeSlot => typeSlot.type.name)
        this.type = this.types[0]
        this.photo = pokemon_info.sprites.other.dream_world.front_default
        this.height = pokemon_info.height
        this.weight = pokemon_info.weight
        this.abilities = pokemon_info.abilities.map(item => item.ability.name)
    }
}