# 🖥️ Aula 01 — Node.js e NPM

## 📌 Introdução

Nesta primeira aula foi realizada uma revisão dos principais conceitos relacionados ao *Node.js* e ao *NPM*, com o objetivo de preparar o ambiente para o desenvolvimento Back-End.

Durante a atividade, foi explorado o funcionamento do Node.js no ambiente *Server-Side*, além da criação de um projeto e de um script capaz de coletar informações do sistema operacional.

---

## 🎯 Objetivo

A atividade teve como objetivo:

* Revisar os conceitos básicos do Node.js;
* Compreender o funcionamento do JavaScript no lado do servidor;
* Verificar a instalação e configuração do ambiente;
* Inicializar um projeto utilizando NPM;
* Criar um script para diagnóstico;
* Utilizar módulos nativos do Node.js;
* Obter informações do sistema através do módulo OS.

---

## 🟢 Node.js

O *Node.js* é um ambiente de execução baseado no JavaScript que possibilita executar programas fora do navegador.

Uma das suas principais características é permitir o desenvolvimento de aplicações que executam no lado do servidor, conhecido como *Server-Side*.

### Funcionamento

text
CLIENTE
   │
   │ Requisição
   ▼
SERVIDOR
   │
   ▼
NODE.JS
   │
   │ Processamento
   ▼
RESPOSTA


Dessa forma, o Node.js pode ser utilizado para desenvolver servidores, APIs e diversas aplicações Back-End.

---

## 📦 NPM

O *NPM (Node Package Manager)* é o gerenciador de pacotes utilizado junto ao Node.js.

Ele permite criar projetos, instalar bibliotecas e gerenciar as dependências utilizadas pela aplicação.

Para verificar se o Node.js está instalado:

bash
node --version


Para verificar o NPM:

bash
npm --version


---

## ⚙️ Configuração do Ambiente

Antes de iniciar o projeto, foi realizada uma verificação do ambiente de desenvolvimento.

### Verificação do Node.js

bash
node -v


### Verificação do NPM

bash
npm -v


Com esses comandos é possível confirmar se as ferramentas necessárias estão disponíveis no terminal.

---

## 🚀 Criando o Projeto

Para iniciar o projeto foi utilizado o NPM:

bash
npm init


Também é possível utilizar a inicialização automática:

bash
npm init -y


Após a execução, é criado o arquivo:

text
package.json


Esse arquivo é responsável por armazenar as principais configurações do projeto.

---

## 🔎 Script de Diagnóstico

Como parte da atividade, foi desenvolvido um pequeno programa para realizar um diagnóstico das características do computador.

O script utiliza recursos nativos do Node.js para consultar informações como:

* Sistema operacional;
* Memória RAM total;
* Memória RAM disponível;
* Processadores instalados.

O arquivo pode ser executado através do comando:

bash
node diagnostico.js


---

## 🧩 Módulo OS

O Node.js possui módulos nativos que fornecem funcionalidades para trabalhar diretamente com recursos do sistema.

Nesta aula foi utilizado o módulo:

javascript
const os = require('os');


O módulo OS permite consultar diversas informações relacionadas ao sistema operacional.

---

## 💻 Métodos Utilizados

### os.platform()

Identifica a plataforma do sistema operacional.

javascript
os.platform();


Um possível resultado no Windows:

text
win32


---

### os.totalmem()

Retorna a quantidade total de memória RAM disponível no computador.

javascript
os.totalmem();


O valor retornado é apresentado em *bytes*.

---

### os.freemem()

Informa a quantidade de memória RAM que está livre no momento da execução.

javascript
os.freemem();


Assim como totalmem(), o resultado é retornado em bytes.

---

### os.cpus()

Obtém informações sobre as CPUs disponíveis no sistema.

javascript
os.cpus();


O retorno contém informações como:

* Modelo do processador;
* Velocidade;
* Dados de cada núcleo lógico.

Para saber apenas a quantidade de CPUs:

javascript
os.cpus().length;


---

## 🧪 Código Desenvolvido

Um exemplo do diagnóstico realizado durante a aula:

javascript
const os = require('os');

console.log('===== DIAGNÓSTICO =====');

console.log('Plataforma:', os.platform());

console.log('Memória total:', os.totalmem());

console.log('Memória livre:', os.freemem());

console.log('CPUs disponíveis:', os.cpus().length);


---

## 📂 Organização

text
aula-01/
│
├── diagnostico.js
├── package.json
├── package-lock.json
└── README.md


### Descrição dos arquivos

| Arquivo             | Função                                |
| ------------------- | ------------------------------------- |
| diagnostico.js    | Executa o diagnóstico do sistema      |
| package.json      | Configura o projeto Node.js           |
| package-lock.json | Registra informações das dependências |
| README.md         | Documentação da atividade             |

---

## ▶️ Executando a Aplicação

Após acessar a pasta do projeto, execute:

bash
node diagnostico.js


O terminal deverá apresentar informações semelhantes a:

text
===== DIAGNÓSTICO =====

Plataforma: win32
Memória total: 17179869184
Memória livre: 8451234560
CPUs disponíveis: 8


> Os resultados mudam de acordo com as características do computador utilizado.

---

## 📚 Resumo da Aula

| Conteúdo        | Prática                                  |
| --------------- | ---------------------------------------- |
| Node.js         | Execução de JavaScript Server-Side       |
| NPM             | Gerenciamento e inicialização do projeto |
| Ambiente        | Verificação do Node.js e NPM             |
| Projeto         | Criação utilizando npm init            |
| Diagnóstico     | Desenvolvimento de um script             |
| Módulo OS       | Acesso a informações do sistema          |
| os.platform() | Identificação da plataforma              |
| os.totalmem() | Memória total                            |
| os.freemem()  | Memória disponível                       |
| os.cpus()     | Informações dos processadores            |

---

## 🧠 Conclusão

A primeira aula permitiu revisar os fundamentos do *Node.js* e do *NPM*, além de apresentar na prática como o JavaScript pode ser executado no ambiente Server-Side.

A criação do script de diagnóstico também possibilitou conhecer um dos módulos nativos do Node.js e entender como uma aplicação pode acessar informações do sistema operacional.

---

## 👨‍💻 Autor

*[Nome do Aluno]*

Atividade desenvolvida durante os estudos de *Desenvolvimento Back-End*.

---

<div align="center">

📚 *Aula 01 — Revisão do Node.js e NPM*

💻 Node.js • NPM • Server-Side • Módulo OS

</div>