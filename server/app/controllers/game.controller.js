const db = require("../models");
const Game = db.games;
const Platform = db.platform;
const Genre = db.genre;
const Op = db.Sequelize.Op;

// Create and Save a new Game
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Game can not be empty!"
        });
        return;
    }

    // Create a Game
    const game = {
        name: req.body.name,
        description: req.body.description,
        // published: req.body.published ? req.body.published : false
    };

    // Save Game in the database
    Game.create(game)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Game."
            });
        });
};

// Retrieve all Games from the database.
//------------------ Fetch all Blogs including comments ------//
exports.findAll = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    return Game.findAll({
        include: ["platform", "genre"],
    }).then((data) => {
        res.send(data);
        //   res.send('index', { games: games, title: 'All games' });
    });
};

// exports.findAll = (req, res) => {
//     const name = req.query.name;
//     var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//     Game.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving games."
//             });
//         });
// };

// Find a single Game with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Game with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Game with id=" + id
            });
        });
};

// Update a Game by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Game.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Game was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Game with id=${id}. Maybe Game was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Game with id=" + id
            });
        });
};

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Game.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Game was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Game with id=${id}. Maybe Game was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Game with id=" + id
            });
        });
};

// Delete all Games from the database.
exports.deleteAll = (req, res) => {
    Game.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Games were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all gamess."
            });
        });
};

// find all published Game
// exports.findAllPublished = (req, res) => {
//     Game.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving gamess."
//             });
//         });
// };