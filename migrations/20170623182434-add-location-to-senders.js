module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Senders', 'coordinates', {
            defaultValue: {},
            type: Sequelize.JSON,
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('Senders', 'coordinates');
    },
};
