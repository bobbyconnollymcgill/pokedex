const { pokemonMiddleware, userMiddleware } = require("./middlewares")
const router = require("express").Router()
module.exports = router

const { uuid } = require("uuidv4")

const users = require("./Users").users

router.use("/:userNameOrId", userMiddleware)
router.get("/", getAllUsers)
router.get("/:userNameOrId", userMiddleware, getUserByName)
router.post("/", postNewUser)
router.put("/:userNameOrId", userMiddleware, updateUserDetails)
router.delete("/:userNameOrId", userMiddleware, deleteUser)
router.post(
    "/:userNameOrId/pokemon/:pokemonNameOrId/capture",
    pokemonMiddleware,
    capturePokemon
)

function getAllUsers(req, res) {
    res.json(users)
}

function getUserByName(req, res) {
    res.json(res.locals.user)
}
function postNewUser(req, res) {
    const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        capturedPokemon: [],
    }

    if (!newUser.name || !newUser.email) {
        return res.sendStatus(400)
    }
    users.push(newUser)
    res.json(users)
}
function updateUserDetails(req, res) {
    const { user } = res.locals
    const found = users.some(
        (user) => user.id === Number(req.params.userNameOrId)
    )
    if (found) {
        const updateUser = req.body
        users.forEach((user) => {
            if (user.id === Number(req.params.userNameOrId)) {
                user.name = updateUser.name ? updateUser.name : user.name
                user.email = updateUser.email ? updateUser.email : user.email
                // res.json(res.locals.user)
                res.json({ msg: "User updated", user })
            }
        })
    } else {
        res.sendStatus(400)
    }
}

function deleteUser(req, res) {
    const { user } = res.locals
    const found = users.some(
        (user) => user.id === Number(req.params.userNameOrId)
    )
    if (found) {
        const deleteUser = req.body
        users.filter((user) => {
            if (user.id !== Number(req.params.userNameOrId)) {
                res.json({
                    msg: "User deleted",
                    users,
                })
            }
        })
    } else {
        res.sendStatus(400)
    }
}

function capturePokemon(req, res) {
    const { user, pokemon } = res.locals

    const found = users.some((user) => {
        return user.capturedPokemon.some((el) => {
            return (
                el.id === Number(req.params.pokemonNameOrId) ||
                el.name.toLowerCase() ===
                    req.params.pokemonNameOrId.toLowerCase()
            )
        })
    })
    if (!found) {
        user.capturedPokemon.push({
            ...pokemon,
            attack: 3,
            defense: 3,
        })
        res.json(user)
    } else {
        res.status(409).json({
            message: "you have already captured the pokemon",
        })
    }
}
