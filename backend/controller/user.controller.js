import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.js";
import UserSchema from "../entity/user.entity.js";

const userRepository = AppDataSource.getRepository(UserSchema);

export async function login(req, res) {
    try{
        const { email, password } = req.body;

const usuario = await userRepository.findOneBy({ email });
    if(!usuario) {
        return res.status(400).json({ mensaje: "Email o contraseña incorrectos"})
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if(!passwordValida){
        return res.status(400).json({ mensaje: "Email o contraseña incorrectos"})
    }

    const token = jwt.sign(
        {id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({ mensaje: "Login Exitoso", token});
    } catch (error) {
        res.status(500).json({ mensaje: "Error al iniciar sesion", error: error.message});
    }
}

