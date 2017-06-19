module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Senders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            externalId: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            chatState: {
                defaultValue: {},
                type: Sequelize.JSON,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Senders');
    },
};
