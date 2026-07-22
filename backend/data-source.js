import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { DataSource } from "typeorm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
import productosSchema from "./entity/productos.entity.js";
import ListaCompraSchema from "./entity/listaCompra.entity.js";
import ItemListaSchema from "./entity/itemLista.entity.js";
import UserSchema from "./entity/user.entity.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [productosSchema, ListaCompraSchema, ItemListaSchema, UserSchema],
});