import Sequelize, { Op } from "sequelize";
import config from "src/config/database";

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
/**
 * Change version of data models that you will ne used by change 'v1' to the version that you were used.
 */
const reqModels = require.context(
    "../",
    true,
    /^\.\/modules\/v1\/.*\/models\/([\w]+\.js)$/
);
reqModels.keys().map(file => {
    const modelData = reqModels(file);
    const initModel = modelData.default || modelData;
    const model = initModel(sequelize, Sequelize);
    Object.assign(db, {
        [ model.name ]: model
    });
});

Object.keys(db).forEach(modelName => {
    if (db[ modelName ].associate) {
        db[ modelName ].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
