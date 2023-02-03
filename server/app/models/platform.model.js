module.exports = (sequelize, Sequelize) => {
    const Platform = sequelize.define("platforms", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Platform;
};