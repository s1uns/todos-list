import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Users = sequelize.define(
    "Users",
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
            unique: true,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The username is required.",
                },
            },
            unique: true,
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
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: "The last name is required.",
                },
                notEmpty: {
                    msg: "The last name should not be empty",
                },
            },
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return `${this.getDataValue("firstName")} ${this.getDataValue(
                    "lastName",
                )}`;
            },
        },
        birthDate: {
            allowNull: false,
            type: DataTypes.DATE,
            validate: {
                notNull: {
                    msg: "The birth date is required.",
                },
                notEmpty: {
                    msg: "The birth date should not be empty",
                },
            },
        },
        gender: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                notNull: {
                    msg: "The gender is required.",
                },
                notEmpty: {
                    msg: "The birth date should not be empty",
                },
            },
        },
        country: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: "The country is required.",
                },
                notEmpty: {
                    msg: "The country should not be empty",
                },
            },
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: "The city is required.",
                },
                notEmpty: {
                    msg: "The city should not be empty",
                },
            },
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: "The password is required.",
                },
                notEmpty: {
                    msg: "The password should not be empty",
                },
            },
        },
    },
    {
        sequelize,
        tableName: "users",
        modelName: "Users",
    },
);

export default Users;
