require("express-async-errors")
const express = require("express");

const migrationsRun = require("./database/sqlite/migrations")

const routes = require("./routes/index.js");

const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "Error",
        message: "Internal server error",
    })
});

const PORT = 3332;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));