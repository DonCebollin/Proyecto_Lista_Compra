import { AppDataSource } from "../data-source.js";
import ItemListaSchema from "../entity/itemLista.entity.js";
import ListaCompraSchema from "../entity/listaCompra.entity.js";
import ProductosSchema from "../entity/productos.entity.js";
import ProductosSchema from "../entity/productos.entity.js";

const itemListRepository = AppDataSource.getRepository(ItemListaSchema);
const listaCompraRepository = AppDataSource.getRepository(ListaCompraSchema);
const productosRepository = AppDataSource.getRepository(ProductosSchema);

export async function createItemLista(req, res) {
    try {
        const { listaId, productoId, cantidad, precio_unitario} = req.body;

        const lista = await listaCompraRepository.findOneBy({ id: listaId});
        if(!lista) {
            return res.status(404).json({ mensaje: "Lista no encontrada"});    
        }

        const producto = await productosRepository.findOneBy({ id: productoId});
        if(!producto){
            return res.status(404).json({ mensaje: "Producto no encontrado"});
        }

        const nuevoItem = itemListRepository.create({
            cantidad,
            precio_unitario,
            lista,
            producto
        });
        await itemListRepository.save(nuevoItem);

        lista.total = Number(lista.total) + cantidad * precio_unitario;
        await listaCompraRepository.save(lista);

        res.status(200).json(nuevoItem);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar producto a la lista", error: error.message});
    }
}

export async function marcarComprado(req, res) {
    try {
        const { id } = req.params;

        const item = await itemListRepository.findOneBy({ id });
        if(!item){
            return res.status(404).json({ mensaje: "Item no encontrado"});
        }

        item.comprado = !item.comprado;
        item.marcado_en = item.comprado ? new Date() : null;

        await itemListRepository.save(item);

        res.status(200).json(item);
    } catch (error) {
        res.status(500).status({ mensaje: "Error al marcar producto", error: error.message});
    }
}

export async function updateItemLista(req, res) {
    try {
        const { id } = req.params;
        const { cantidad, precio_unitario} = req.body;

        const item = itemListRepository.findOne({
            where: { id },
            relations: { lista: true}
        });
        if(!item){
            return res.status(404).json({ mensaje: "Item no encontrado"});
        }

        const subtotalAnterior = item.cantidad * Number(item.precio_unitario);
        const subtotalNuevo = cantidad * precio_unitario;

        item.cantidad = cantidad;
        item.precio_unitario = precio_unitario;
        await itemListRepository.save(item);

        item.lista.total = Number(item.lista.total) - subtotalAnterior + subtotalNuevo;
        await listaCompraRepository.save(item.lista);

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar item", error: error.message});
    }
}