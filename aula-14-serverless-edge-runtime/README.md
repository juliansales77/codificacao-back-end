# 🚀 Aula 14: Serverless e Edge Runtime (Vercel)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Este módulo demonstra a criação de uma **Edge Function** serverless estruturada para deploy na plataforma **Vercel**, utilizando o runtime **Edge** (`runtime: 'edge'`) para respostas de altíssima velocidade e baixa latência através de Web API Standards nativos (`Request` / `Response`).

---

## 📂 Estrutura do Projeto

```text
aula-14-serverless-edge-runtime/
├── .vercel/          # Arquivos de build e configurações locais da Vercel (ignorado no Git)
├── api/
│   └── hora-servidor.ts   # Handler da Edge Function
├── .gitignore         # Ignora arquivos temporários e dependências (.vercel)
├── package.json       # Configurações e dependências do módulo
└── README.md          # Documentação do projeto
```

---

## 🛠️ Código da Função (`api/hora-servidor.ts`)

A função utiliza a API `Response` global e obtém o cabeçalho `x-vercel-id` para identificar a região de execução Serverless/Edge:

```typescript
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const inicio = Date.now();
  const vercelId = req.headers.get('x-vercel-id') || 'N/A';
  const regiao = vercelId ? vercelId.split(':')[0] : 'local-dev';

  return new Response(
    JSON.stringify({
      mensagem: 'Função executada com sucesso',
      horarioServidor: new Date().toLocaleString('pt-BR'),
      regiao: regiao,
      tempoExecucao: `${Date.now() - inicio} ms`,
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  );
}
```

---

## ⚙️ Configuração do `.gitignore`

Para evitar enviar arquivos compilados e locais da CLI da Vercel ao repositório:

```text
.vercel
```

---

## 📦 `package.json`

```json
{
  "name": "aula-14-serverless-edge-runtime",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

---

## ⚡ Como Executar e Testar Localmente

1. **Acesse o diretório do módulo:**
   ```bash
   cd aula-14-serverless-edge-runtime
   ```

2. **Execute o ambiente de desenvolvimento local da Vercel:**
   ```bash
   npx vercel dev
   ```

3. **Acesse a rota no navegador ou Insomnia:**
   ```text
   http://localhost:3000/api/hora-servidor
   ```

4. **Exemplo de Resposta (JSON):**
   ```json
   {
     "mensagem": "Função executada com sucesso",
     "horarioServidor": "06/10/2026 15:52:10",
     "regiao": "local-dev",
     "tempoExecucao": "0 ms"
   }
   ```