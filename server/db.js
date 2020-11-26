const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "1817",
    host: "localhost",
    port: 5432,
    database: "jwttoken"
});

module.exports = pool;