const { Sequelize, DataTypes, Op } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE.toLowerCase()
    }
);

const Users = sequelize.define(
    'users', 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
)

const Budgets = sequelize.define(
    'budgets',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        period: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    }
)

const BudgetTypes = sequelize.define(
    'budget_types',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)

async function initBudgetTypes() {
    const types = ['Alimentação', 'Lazer', 'Educação', 'Investimentos', 'Transporte'];

    const getBudgetTypes = await BudgetTypes.findAll({
        where: {  
            name: {
                [Op.in]: types
            }  
        } 
    });
    
    const existingNames = getBudgetTypes.map(t => t.name);
    const missingTypes = types.filter(t => !existingNames.includes(t));

    if (missingTypes.length === 0) {
        return;
    }

    await BudgetTypes.bulkCreate(missingTypes.map(name => ({ name })));
}

initBudgetTypes()

module.exports = {sequelize, Users, Budgets, BudgetTypes}