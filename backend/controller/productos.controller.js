import { AppDataSource } from "../data-source.js";
import ProductosSchema from "../entity/productos.entity.js";

const productosRepository = AppDataSource.getRepository(ProductosSchema);

export async function createProductos(req, res) {
    try{
        const { nombre } = req.body;

        const nuevoProducto = productosRepository.create({ nombre });
        await productosRepository.save(nuevoProducto);

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear producto "});
    }
}

export async function getProductos(req, res) {
    try{
        const productos = await productosRepository.find();
        res.status(200).json(productos);
    } catch (error){
        res.status(500).json({ mensaje: "Error al obtener productos ", error: error.message});
    }
}

export async function updateProductos(req, res) {
    try{
        const { id } = req.params;
        const { nombre } = req.body;

        const producto = await productosRepository.findOneBy({ id });
        if(!producto){
            return res.status(400).json({ mensaje: "Producto no encontrado" });
        }

        producto.nombre = nombre;
        await productosRepository.save(producto);

        res.status(200).json(producto);
    } catch (error){
        res.status(500).json({ mensaje: "Error al actualizar producto", error: error.message});
    }
    
}

export async function deleteProducto(req, res) {
    try{
        const { id } = req.params;

        const producto = await productosRepository.findOneBy({ id });
        if(!producto){
            return res.status(400).json({ mensaje: "Producto no encontrado"});
        }
        await productosRepository.remove(producto);
        
        res.status(200).json({ mensaje: "Producto eliminado correctamente"});
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar producto", error: error.message})
    }
}