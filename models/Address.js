module.exports = function (sequelize, DataTypes) {
    var Address = sequelize.define("Address", {
        addressLine1: {
            type: DataTypes.STRING
        },
        addressLine2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });

    Address.associate = function (models) {
        Address.belongsTo(models.Property,{
            onDelete: "cascade"
        });
    }; 

    return Address;
};