import { z } from "zod";
import { RequestHandler } from "express";
import * as authService from '../services/auth';

export const login: RequestHandler = (req, res) => {

    const loginSchema = z.object({
        password: z.string()
    });

    const body = loginSchema.safeParse(req.body);
    if(!body.success) return res.json({ error: 'Dados inválidos' });

    if (!authService.validadePassword(body.data.password)) {
        res.status(403).json({ error: 'Credenciais inválidas' });
    }

    res.json({ token : authService.createToken() });
}

export const validade: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !authService.validadeToken(token)) {
        return res.status(403).json({ error: 'Acesso Negado' });
    }

    next();
}