const { databaseConfig } = require('./config');
const mongoose = require('mongoose');

const getConnection = async (logger) => {
    try {
        const uri = `mongodb+srv://${databaseConfig.dbUserName}:${databaseConfig.dbPassword}@${databaseConfig.dbCluster}.zpsw0.mongodb.net/${databaseConfig.dbName}?retryWrites=true&w=majority`;
        const connection = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('connect mongodb successfully');
        return connection
    } catch (error) {
        logger.info('connect mongodb fail');
        throw new Error(error);
    }
}

const queryByObject = async (obj, model) => {
    try {
        const result = await model.find(obj);
        return result;
    } catch (error) {
        throw error;
    }
}

const updateByObject = async (obj, model, condition) => {
    try {
        const result = await model.updateOne(condition, obj);
        return result;
    } catch (error) {
        throw error;
    }
}

const createByObject = async (obj, model) => {
    try {
        const result = await (new model(obj)).save();
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteByObject = async (model, condition) => {
    try {
        const result = await model.deleteOne(condition);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getConnection,
    queryByObject,
    updateByObject,
    createByObject,
    deleteByObject,
};
