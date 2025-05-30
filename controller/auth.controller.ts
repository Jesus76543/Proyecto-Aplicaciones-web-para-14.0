import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import cache from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcryptjs"; // Agregado para encriptar contraseñas

// LOGIN
export const login = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user){
        return res.status(426).json({message: "Credenciales incorrectas"});
    }

    const accessToken = generateAccessToken(user.id);

    cache.set(user.id, accessToken, 60 * 15);

    return res.status(200).json({
        message: 'Bien',
        accessToken
    });
};


// TIEMPO DE TOKEN
export const getTimeToken = (
    req: Request<{}, {}, {}, { userId?: string }>,
    res: Response
): Response | undefined => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "Falta userId en query" });
    }

    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: 'Token no existente :o' });
    }

    const now = Date.now();
    const timeleft = Math.floor((ttl - now) / 1000);
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.status(200).json({
        message: 'Token existente',
        timeleft,
        expTime
    });
};

// ACTUALIZAR TOKEN
export const updateToken = (req: Request, res: Response): Response | undefined => {
    const { userId } = req.params;

    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no existe" });
    }

    cache.ttl(userId, 60 * 15); // nuevo TTL

    return res.json({ message: "Token actualizado" });
};

// OBTENER USUARIOS
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const { userEmail } = req.query;
    const userList = await User.find();
    const userByEmail = await User.find({ Email: userEmail });

    console.log(userByEmail);
    res.json({ userList });
};

// GUARDAR USUARIO (con encriptación)
export const saveUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptar

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            createDate: Date.now(),
            status: true
        });

        const user = await newUser.save();
        res.json({ user });
    } catch (error) {
        res.status(426).json({ error });
    }
};

// ACTUALIZAR USUARIO
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, phone, role, password } = req.body;

    try {
        let updatedFields: any = { name, phone, role };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        res.json({ message: "Usuario actualizado", user });
    } catch (error) {
        res.status(500).json({ error });
    }
};
export const deleteUser = async (req: Request, res: Response): Promise <void>  => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndUpdate(
            id,
            {
                status: false,
                deleteDate: new Date()
            },
            { new: true }
        );

        if (!deletedUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario desactivado', deletedUser });

    } catch (error) {
        console.log("Error en deleteUser: ", error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};