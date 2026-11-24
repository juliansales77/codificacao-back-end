import { registerAs } from "@nestjs/config";

export default registerAs('auth', () =>({
    jwtSecret: process.env.JWT_SECRET || 'chave_secreta_padrao',
    jwpWxpireIn: process.env.JWT_EXPRESS_IN || '1d',
}));