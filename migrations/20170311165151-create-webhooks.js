module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Webhooks', {
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
            target: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            secret: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            triggers: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.TEXT),
                defaultValue: ['*'],
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
        return queryInterface.dropTable('Webhooks');
    },
};
