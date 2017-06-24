module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Senders', 'username', {
            type: Sequelize.TEXT,
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('Senders', 'username');
    },
};
