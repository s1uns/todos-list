"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: "The email is required.",
                    },
                    isEmail: {
                        msg: "Must be a valid email address",
                    },
                },
            },
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: "The first name is required.",
                    },
                },
            },
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The last name is required.",
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        },
    );
    return User;
};
