import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source.js";
import userRoutes from "./routes/user.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import listaCompraRoutes from "./routes/listaCompra.routes.js";
import itemListaRoutes from "./routes/itemLista.routes.js";
import { verifyToken } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/productos", verifyToken, productosRoutes);
app.use("/api/listas", verifyToken, listaCompraRoutes);
app.use("/api/items", verifyToken, itemListaRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
    });
