import { AppDataSource } from "../data-source.js";
import ListaCompraSchema from "../entity/listaCompra.entity.js";
import UserSchema from "../entity/user.entity.js";

const listaCompraRepository = AppDataSource.getRepository(ListaCompraSchema);
const userRepository = AppDataSource.getRepository(UserSchema);

export async function createListaCompra(req, res) {
    try{
        const usuarios = await userRepository.find();

        const nuevaLista = listaCompraRepository.create({
            usuarios
        });

        await listaCompraRepository.save(nuevaLista);

        res.status(201).json(nuevaLista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear lista", error: error.message});
    }
}

export async function getListaActiva(req, res) {
    try{
        const lista = await listaCompraRepository.findOne({
            where: { estado: "abierta"},
            relations: { items: { producto: true}, usuarios: true}
        });

        if(!lista) {
            return res.status(404).json({ mensaje: "No hay una lista activa "});
        }

        res.status(200).json(lista);
    } catch (error){
        res.status(500).json({ mensaje: "Errror al obtener lista activa", error: error.message});
    }   
}

export async function cerrarListaActiva(req, res) {
    try{
        const lista = await listaCompraRepository.findOne({
            where: { estado: "abierta"}
        });

        if(!lista){
            return res.status(404).json({ mensaje: "No hay una lista activa"});
        }

        lista.estado = "cerrada";
        lista.closed_at = new Date();

        await listaCompraRepository.save(lista);

        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al cerrar lista", error: error.message})
    }
}

export async function getHistorialListas(req, res) {
    try {
        const listas = await listaCompraRepository.find({
            where: { estado: "cerrada"},
            relations: { items: { producto: true }, usuarios: true},
            order: { closed_at: "DESC"}
        });

        res.status(200).json(listas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener historial", error: error.message});
    }
}

export async function deleteListaCompra(req, res) {
    try{
        const { id } = req.params;

        const lista = await listaCompraRepository.findOneBy({id});
        if(!lista){
            return res.status(404).json({ mensaje: "Lista no encontrada"});
        }

        await listaCompraRepository.remove(lista);

        res.status(200).json({ mensaje: "Lista eliminada"})
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar lista", error: error.message});
    }
}

