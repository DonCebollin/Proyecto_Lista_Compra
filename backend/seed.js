import "dotenv/config";
import bcrypt from "bcryptjs";
import { AppDataSource } from "./data-source.js";
import UserSchema from "./entity/user.entity.js";

const usuarios = [
    {
        nombre: process.env.SEED_USER1_NOMBRE,
        email: process.env.SEED_USER1_EMAIL,
        password: process.env.SEED_USER1_PASSWORD
    },
    {
        nombre: process.env.SEED_USER2_NOMBRE,
        email: process.env.SEED_USER2_EMAIL,
        password: process.env.SEED_USER2_PASSWORD
    }
];

async function seed() {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(UserSchema);

    for (const u of usuarios) {
        const existe = await userRepository.findOneBy({ email: u.email });
        if (existe) {
            console.log(`Ya existe: ${u.email}`);
            continue;
        }
        const passwordHasheada = await bcrypt.hash(u.password, 10);
        const nuevo = userRepository.create({ ...u, password: passwordHasheada });
        await userRepository.save(nuevo);
        console.log(`Creado: ${u.email}`);
    }

    await AppDataSource.destroy();
}

seed();