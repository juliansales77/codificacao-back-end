export interface variaveisAmbiente{
    NODE_ENV: 'desenvolvimento' | 'preocucao' | 'teste'
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
}