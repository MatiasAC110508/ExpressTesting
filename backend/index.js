const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;       // The port number
const HOST = "localhost"; // The host address

app.use(express.json());

// Create the connection to the db
const connection = mysql.createConnection({
    host: HOST,
    user: "root",
    password: "Qwe.123*", 
    database: "ventas_db"
});

// Test connection
connection.connect((err) => {
    if (err) {
        console.error(`Error de conexión: ${err.message}`);
        return;
    }
    console.log("¡Conectado exitosamente a la base de datos!");
});

// Iniciate server
app.listen(PORT, () => {
    console.log(`Running server at: http://${HOST}:${PORT}`);
});