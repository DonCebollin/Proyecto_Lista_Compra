import express from "express";
import { appDataSource } from "./data-source.js";

const app = express();

app.use(express.json());

appDataSource.initialize()
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
    });