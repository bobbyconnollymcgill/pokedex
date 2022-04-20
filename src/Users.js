const pokemon = require("./pokemon.json")

const users = [
    {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        capturedPokemon: [],
    },
    {
        id: 2,
        name: "Smith",
        email: "smith@gmail.com",
        capturedPokemon: [],
    },
    {
        id: 3,
        name: "Chris",
        email: "chris@gmail.com",
        capturedPokemon: [],
    },
    {
        id: 4,
        name: "Jack",
        email: "jack@gmail.com",
        capturedPokemon: [],
    },
]
module.exports = {
    users,
    pokemon,
}
