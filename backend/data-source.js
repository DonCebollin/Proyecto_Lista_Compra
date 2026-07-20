import "dotenv/config";
import { DataSource } from "typeorm";
import productosSchema from "./entity/productos.entity.js";
import ListaComprasSchema from "./entity/listaCompras.entity.js";
import ItemListaComprasSchema from "./entity/itemListaCompras.entity.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [productosSchema, ListaComprasSchema, ItemListaComprasSchema],
});