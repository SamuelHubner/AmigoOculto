import { getToday } from "../utils/getToday"
import crypto from 'crypto';

export const validadePassword = (password: string): boolean => {
    const currentPassWorkd = getToday().split('/').join('');
    return password === currentPassWorkd;
}

export const createToken = (): string => {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
}

export const validadeToken = (token: string): boolean => {
    const currentToken = createToken();
    return token === currentToken;
}