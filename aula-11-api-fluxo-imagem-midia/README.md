📸 API de Fluxo de Mídia e Upload de Imagens — NestJS

API desenvolvida com NestJS para gerenciamento de uploads de arquivos de imagem no servidor local. O projeto conta com validações automatizadas de tipo MIME, restrição de tamanho de arquivo, renomeação segura utilizando identificadores únicos (UUID) e tratamento de exceções HTTP.

🚀 Funcionalidades

Upload de Imagens: Processamento de requisições multipart/form-data via interceptador do Multer.

Nomes Únicos e Seguros: Formatação automática do nome de cada arquivo gerado usando UUID v4 e a extensão original, evitando sobrescritas acidentais.

Validação de Formatos: Filtro rigoroso aceitando apenas extensões .jpg, .jpeg, .png e .webp.

Limite de Tamanho: Restrição máxima configurada para arquivos de até 2 MB.

Armazenamento Local: Salvamento estruturado na pasta ./uploads.

🛠️ Tecnologias Utilizadas

NestJS — Framework Node.js progressivo

TypeScript — Linguagem tipada

Multer / Express — Middleware para manipulação de multipart/form-data

UUID — Gerador de identificadores únicos

Class-Validator / RxJS — Suporte e utilitários da arquitetura NestJS

📦 Requisitos Prévios

Antes de começar, garante que tens instalado na tua máquina:

Node.js (versão 18 ou superior)

npm ou yarn

🔧 Instalação e Configuração

Clonar o repositório ou acessar a pasta do projeto:

cd aula-11-api-fluxo-imagem-midia


Instalar as dependências do projeto:

npm install


Garantir a instalação das dependências de Upload e UUID (caso necessário):

npm install uuid
npm install -D @types/uuid @types/multer


🗂️ Estrutura do Projeto

aula-11-api-fluxo-imagem-midia/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── midia.controller.ts
│   └── midia.module.ts
├── uploads/              # Pasta criada automaticamente para armazenar os arquivos
├── package.json
├── tsconfig.json
└── README.md


⚙️ Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com recarregamento automático (watch mode):

npm run start:dev


A aplicação estará acessível em: http://localhost:3000

📬 Documentação do Endpoint

1. Realizar Upload de Imagem

Rota: /midia/upload

Método HTTP: POST

Content-Type: multipart/form-data

Campo do Formulário: arquivo (File)

🟢 Resposta de Sucesso (201 Created)

{
  "filename": "f3b2c1d0-1234-4a56-b789-0abc12345678.png",
  "size": 524288,
  "url": "http://localhost:3000/api/uploads/f3b2c1d0-1234-4a56-b789-0abc12345678.png"
}


🔴 Respostas de Erro (400 Bad Request)

Nenhum arquivo enviado:

{
  "message": "Nenhum arquivo enviado",
  "error": "Bad Request",
  "statusCode": 400
}


Formato não permitido (ex.: .tiff, .pdf, .gif):

{
  "message": "Apenas arquivos do tipo: jpg, jpeg, png, webp",
  "error": "Bad Request",
  "statusCode": 400
}


Arquivo maior que o limite de 2 MB:

{
  "statusCode": 400,
  "message": "File too large"
}


🧪 Como Testar no Insomnia / Postman

Abra o Insomnia ou Postman.

Crie uma nova requisição com o método POST e URL http://localhost:3000/midia/upload.

Na aba Body, selecione a opção Multipart Form (ou form-data).

Adicione uma chave chamada arquivo e altere o tipo para File.

Clique no campo de valor, selecione uma imagem do seu computador (.jpg, .png, .webp < 2MB).

Clique em Send.

📄 Licença

Este projeto foi desenvolvido para fins educacionais e de aprendizado em desenvolvimento Back-End com NestJS.