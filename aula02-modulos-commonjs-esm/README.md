# Aula 02 - Módulos CommonJS vs ES Modules (`aula02-modulos-commonjs-esm`)

Este documento compila e analisa todo o código, configurações e saídas de log fornecidos na **Aula 02**, apresentando diagnósticos detalhados dos problemas observados e as soluções recomendadas.

## 📄 1. Código e Configurações Originais

### 1.1 `package.json`
```json
{
  "name": "aula02-modulos-commonjs-esm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```
> **Nota de Configuração:** A propriedade `"type": "module"` define que o Node.js tratará todos os arquivos `.js` neste projeto como **ES Modules (ESM)**, permitindo o uso nativo das palavras-chave `import` e `export`.

### 1.2 Função de Log (`formatLog`)
```javascript
export function formatLog(mensagem){
    const dataAtual = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().toLocaleTimeString();
    return `[${dataAtual}  ${horaAtual}] - ${mensagem}`;
}
```
---

## 📊 2. Saída de Logs Registrada

```text
[2026-09-11  16:16:56] - Conexão com o banco de dados estabelecida![2026-09-11  16:16:56] - Inicialização do servidor concluída!
[2026-09-11  16:17:42] - Inicialização do servidor concluída!
[2026-09-11  16:17:42] - Conexão com o banco de dados estabelecida!
```
---

## 🔍 3. Análise Detalhada dos Problemas Identificados

### 🚩 Problema 1: Formatação de Data/Hora (Mismatch UTC vs Fuso Local)
Na função original:
* `new Date().toISOString().split('T')[0]` retorna a data em **UTC** (Zero Greenwich).
* `new Date().toLocaleTimeString()` retorna a hora no **fuso horário local** da máquina.
* **Inconsistência:** Em horários próximos à meia-noite (UTC), a data mudará para o dia seguinte enquanto o horário ainda exibirá a noite anterior do fuso local.
* **Espaçamento:** Há um duplo espaço no template string (`[${dataAtual}  ${horaAtual}]`).

### 🚩 Problema 2: Ausência de Quebra de Linha (`
`)
No primeiro registro de log:
```text
...estabelecida![2026-09-11  16:16:56] - Inicialização...
```
As duas mensagens foram impressas na mesma linha. Isso acontece se as strings forem concatenadas ou emitidas via `process.stdout.write()` sem o caractere de nova linha (`
`) ao final.

### 🚩 Problema 3: Corrida de Assincronismo (Race Condition)
Compare a ordem das chamadas entre as duas execuções:
* **Execução 1 (16:16:56):** Banco de dados conectou **antes** do servidor.
* **Execução 2 (16:17:42):** Servidor inicializou **antes** do banco de dados.

Como conexões de banco de dados e subida de servidores HTTP são operações assíncronas (Promises), a ausência de `await` ou `Promise.all` encadeado faz com que o Node.js execute as tarefas em paralelo sem garantia de ordem.

---

## 🛠️ 4. Soluções e Código Refatorado

### 4.1 Módulo `logger.js` (Refatorado)

```javascript
/**
 * Formata uma mensagem com data/hora sincronizadas no fuso horário local
 * e garante a quebra de linha individual.
 * 
 * @param {string} mensagem - Texto do log
 * @returns {string} Mensagem formatada com timestamp e quebra de linha
 */
export function formatLog(mensagem) {
    const timestamp = new Date().toLocaleString('pt-BR');
    return `[${timestamp}] - ${mensagem}\n`;
}
```

---

### 4.2 Script Principal `index.js` (Com Controle Assíncrono)

Para garantir que o banco de dados seja conectado **sempre antes** que o servidor seja liberado:

```javascript
import { formatLog } from './logger.js';

// Simulação de operações assíncronas (ex: requisições I/O)
const conectarBanco = () => new Promise((resolve) => setTimeout(resolve, 500));
const iniciarServidor = () => new Promise((resolve) => setTimeout(resolve, 300));

async function bootstrap() {
    try {
        // Garante a ordem correta de inicialização
        await conectarBanco();
        process.stdout.write(formatLog('Conexão com o banco de dados estabelecida!'));

        await iniciarServidor();
        process.stdout.write(formatLog('Inicialização do servidor concluída!'));
    } catch (erro) {
        console.error('Erro durante a inicialização do sistema:', erro);
    }
}

bootstrap();
```

---

### 4.3 Comparativo: ES Modules (ESM) vs CommonJS (CJS)

Como este projeto utiliza `"type": "module"`, veja como o módulo funciona em cada especificação:

| Ação | ES Modules (`.js` com `"type": "module"`) | CommonJS (`.cjs` ou sem `"type": "module"`) |
| :--- | :--- | :--- |
| **Exportar** | `export function formatLog(msg) { ... }` | `module.exports = { formatLog };` |
| **Importar** | `import { formatLog } from './logger.js';` | `const { formatLog } = require('./logger');` |
| **Extensão obrigatória?** | **Sim** (obrigatório `./logger.js`) | Não (pode omitir `.js`) |
| **Execução** | Assíncrona / Estática | Síncrona / Dinâmica |

---

### 4.4 `package.json` (Otimizado para Desenvolvimento)

```json
{
  "name": "aula02-modulos-commonjs-esm",
  "version": "1.0.0",
  "description": "Comparativo e uso prático de CommonJS e ES Modules com tratamento de logs assíncronos",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["nodejs", "esm", "commonjs", "logging", "async"],
  "author": "",
  "license": "ISC"
}
```

---

## 🚀 5. Como Executar o Projeto

1. **Execução Padrão (ESM):**
   ```bash
   npm start
   ```

2. **Modo de Desenvolvimento (Watch Mode - Node v18+):**
   ```bash
   npm run dev
   ```