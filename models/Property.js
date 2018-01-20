module.exports = function (sequelize, DataTypes) {
    var Property = sequelize.define("Property", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        addressln1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        addressln2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        statecode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        capacity: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.BLOB
        }
    });

    Property.associate = function (models) {
        Property.hasOne(models.Address,{
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade"
        });
        Property.belongsTo(models.Landlord, {
            foreignKey: {
                allowNull: false
            }
        });
        Property.hasMany(models.Application, {
            onDelete: "cascade"
        });
    };

    return Property;
};