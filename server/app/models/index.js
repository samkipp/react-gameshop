const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.games = require("./games.model.js")(sequelize, Sequelize);
db.genre = require("./genre.model.js")(sequelize, Sequelize);
db.platform = require("./platform.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.games.hasMany(db.genre, { as: "genre" }, { onDelete: 'cascade' });
db.genre.belongsToMany(db.games, {
    through: "games_genre",
    foreignKey: "genreId",
    otherKey: "gameId"
});
db.games.belongsToMany(db.genre, {
    through: "games_genre",
    foreignKey: "gameId",
    otherKey: "genreId"
});

db.games.hasMany(db.platform, { as: "platform" }, { onDelete: 'cascade' });
db.platform.belongsToMany(db.games, {
    through: "games_platform",
    foreignKey: "platformId",
    otherKey: "gameId"
});
db.games.belongsToMany(db.platform, {
    through: "games_platform",
    foreignKey: "gameId",
    otherKey: "platformId"
});

db.ROLES = ["user", "admin"];

module.exports = db;