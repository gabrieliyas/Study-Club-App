import {Sequelize} from "sequelize";

const db = new Sequelize('studyclub_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;