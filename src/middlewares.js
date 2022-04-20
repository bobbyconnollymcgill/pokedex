const { pokemon, trainers } = require("./state")
const { users } = require("./Users")

function pokemonMiddleware(req, res, next) {
    const pokemonNameOrId = req.params.pokemonNameOrId

    const num = Number(pokemonNameOrId)

    let foundPokemon
    if (num) {
        foundPokemon = pokemon.find(function (el) {
            return el.id === num
        })
    } else {
        const pokemonName = pokemonNameOrId
        foundPokemon = pokemon.find(function (el) {
            return el.name.toLowerCase() === pokemonName.toLowerCase()
        })
    }

    if (!foundPokemon) {
        res.status(404).end()
        return
    }

    res.locals.pokemon = foundPokemon
    next()
}

function trainerMiddleware(req, res, next) {
    const trainerNameOrId = req.params.trainerNameOrId

    const num = Number(trainerNameOrId)

    let foundTrainer
    if (num) {
        foundTrainer = trainers.find(function (el) {
            return el.id === num
        })
    } else {
        const trainerName = trainerNameOrId
        foundTrainer = trainers.find(function (el) {
            return el.name.toLowerCase() === trainerName.toLowerCase()
        })
    }

    if (!foundTrainer) {
        res.status(404).end()
        return
    }

    res.locals.trainer = foundTrainer
    next()
}
function userMiddleware(req, res, next) {
    const userNameOrId = req.params.userNameOrId

    const num = Number(userNameOrId)

    let foundUser
    if (num) {
        foundUser = users.find(function (el) {
            return el.id === num
        })
    } else {
        const userName = userNameOrId
        foundUser = users.find(function (el) {
            return el.name.toLowerCase() === userName.toLowerCase()
        })
    }

    if (!foundUser) {
        res.status(404).end()
        return
    }

    res.locals.user = foundUser
    next()
}
module.exports = {
    pokemonMiddleware,
    trainerMiddleware,
    userMiddleware,
}
