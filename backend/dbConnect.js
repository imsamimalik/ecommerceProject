let sql = require("mssql");

const dbConfig = {
    server: "localhost",
    user: "sa",
    password: "Sami@123",
    database: "Ecommerce",
    options: {
        trustedConnection: true,
        encrypt: true,
        trustServerCertificate: true,
    },
};

let dbConnect = new sql.ConnectionPool(dbConfig);

module.exports = dbConnect;
