import { Request, Response } from 'express';
import { generarToken } from '../utils/jwt';

const validarCredenciales = (usuario: string, contraseña: string): boolean => {
    console.log('🔍 Validando credenciales:', { usuario, contraseña }); // Debug
    return usuario === 'admin' && contraseña === 'password123';
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    console.log('📝 Request body:', req.body); // Debug
    const { usuario, contraseña, username, password } = req.body;

    // Aceptar tanto 'usuario/contraseña' como 'username/password'
    const user = usuario || username;
    const pass = contraseña || password;

    if (!user || !pass) {
        return res.status(400).json({ 
            error: 'Usuario y contraseña son requeridos',
            formato: 'Usar "usuario" y "contraseña" o "username" y "password"'
        });
    }

    if (validarCredenciales(user, pass)) {
        const token = generarToken({ usuario: user });
        return res.json({ token });
    }

    return res.status(401).json({ 
        error: 'Credenciales inválidas',
        
    });
};

