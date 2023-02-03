module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        name: {
            type: Sequelize.STRING
        },
        released: {
            type: Sequelize.STRING
        },
        publisher: {
            type: Sequelize.STRING
        },
        developer: {
            type: Sequelize.STRING
        },
        background_image: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        rating_top: {
            type: Sequelize.INTEGER
        },
        ratings_count: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        short_description: {
            type: Sequelize.STRING
        }
    });

    return Game;
};