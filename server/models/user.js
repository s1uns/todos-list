import { Sequelize, DataTypes }from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");
const User = sequelize.define(
    "User",
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
                min: { args: 0, msg: "The gender can only be positive." },
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
            type: DataTypes.DATE,
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
            type: DataTypes.DATE,
            validate: {
                notNull: {
                    msg: "The city is required.",
                },
                notEmpty: {
                    msg: "The city should not be empty",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
    },
);

User.hasMany(sequelize.models.Todo, { foreignKey: "creatorId" });

export default User
