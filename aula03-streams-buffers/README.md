# Aula 03 - Streams e Buffers no Node.js

Este projeto foi desenvolvido como parte do módulo de **Codificação Back-End**, abordando o uso prático de **Streams** e **Buffers** no Node.js para manipulação eficiente de arquivos de grande porte com baixo consumo de memória RAM.

---

## 📁 Estrutura do Projeto (`aula03-streams-buffers`)

Com base na estrutura de arquivos do projeto:

```text
aula03-streams-buffers/
├── apenas_erros.log       # Arquivo filtrado contendo apenas as linhas com logs de ERROR
├── geradorLogs.js         # Script para geração massiva de logs simulados (200.000 linhas)
├── package.json           # Configuração do projeto Node.js com ES Modules ("type": "module")
├── processarLogs.js       # Script de leitura via Stream e Readline para filtragem dos erros
└── servidor.log           # Arquivo bruto de logs gerado pelo script
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+)
- **ES Modules (`import/export`)**
- Módulos nativos do Node.js:
  - `node:fs` (File System / WriteStream & ReadStream)
  - `node:readline` (Leitura linha a linha baseada em eventos/iteradores assíncronos)
  - `process.memoryUsage()` (Monitoramento do consumo de memória Heap e RSS)

---

## 🚀 Scripts e Códigos

### 1. `package.json`
Configuração básica habilitando a sintaxe de Módulos ES (`"type": "module"`):

```json
{
  "name": "aula03-streams-buffers",
  "version": "1.0.0",
  "description": "Estudo prático de Streams e Buffers no Node.js",
  "main": "processarLogs.js",
  "scripts": {
    "gerar": "node geradorLogs.js",
    "processar": "node processarLogs.js"
  },
  "keywords": ["nodejs", "streams", "buffers", "performance"],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

---

### 2. Gerador de Logs (`geradorLogs.js`)
Gera um arquivo de log volumoso (`servidor.log`) com 200.000 linhas usando `fs.createWriteStream`. A cada 7 linhas, grava uma linha marcada como `ERROR`.

```javascript
import fs from 'node:fs';

const streamEscrita = fs.createWriteStream('servidor.log');
console.log('Gerando arquivo de log simulado...');

for (let i = 0; i < 200000; i++) {
  const tipo = i % 7 === 0 ? 'ERROR' : 'ENFO';
  streamEscrita.write(`[2026-09-11] Line ${i}: status 200 - Mensagen de test ${tipo}\n`);
}

streamEscrita.end();
streamEscrita.on('finish', () => {
  console.log('Arquivo servidor.log gerado com sucesso!');
});
```

---

### 3. Processador e Filtro de Logs (`processarLogs.js`)
Lê o arquivo `servidor.log` sob demanda utilizando `fs.createReadStream` e `readline`, filtrando apenas os registros que contêm `ERROR` e gravando-os em `apenas_erros.log`. Além disso, exibe o consumo de memória RAM antes e depois do processamento.

```javascript
import fs from 'node:fs';
import readline from 'node:readline';

async function filtrarErros() {
  console.log('INICIANDO PROCESSAMENTO COM STREAM');
  exibirConsumoMemoria('Início');

  const streamLeitura = fs.createReadStream('servidor.log');
  const streamEscrita = fs.createWriteStream('apenas_erros.log');

  const leitorLinhaLinha = readline.createInterface({
    input: streamLeitura,
    crlfDelay: Infinity,
  });

  let totalErros = 0;

  for await (const linha of leitorLinhaLinha) {
    if (linha.includes('ERROR')) {
      streamEscrita.write(linha + '\n');
      totalErros++;
    }
  }

  streamEscrita.end();

  exibirConsumoMemoria('Fim');
  console.log(`Processamento Concluído! Quantidade de erros encontrados: ${totalErros} linhas`);
}

function exibirConsumoMemoria(etapa) {
  const memoria = process.memoryUsage();
  const rssMB = (memoria.rss / 1024 / 1024).toFixed(2);
  const heapMB = (memoria.heapUsed / 1024 / 1024).toFixed(2);
  console.log(`[${etapa}] RSS: ${rssMB} MB | Heap Utilizado: ${heapMB} MB`);
}

filtrarErros();
```

---

## 📊 Exemplo de Saída dos Arquivos de Log

### `servidor.log` (Arquivo Bruto - 200.000 linhas):
```text
[2026-09-11] Line 0: status 200 - Mensagen de test ERROR
[2026-09-11] Line 1: status 200 - Mensagen de test ENFO
[2026-09-11] Line 2: status 200 - Mensagen de test ENFO
[2026-09-11] Line 3: status 200 - Mensagen de test ENFO
[2026-09-11] Line 4: status 200 - Mensagen de test ENFO
[2026-09-11] Line 5: status 200 - Mensagen de test ENFO
[2026-09-11] Line 6: status 200 - Mensagen de test ENFO
[2026-09-11] Line 7: status 200 - Mensagen de test ERROR
```

### `apenas_erros.log` (Arquivo Filtrado - ~28.572 linhas):
```text
[2026-09-11] Line 0: status 200 - Mensagen de test ERROR
[2026-09-11] Line 7: status 200 - Mensagen de test ERROR
[2026-09-11] Line 14: status 200 - Mensagen de test ERROR
[2026-09-11] Line 21: status 200 - Mensagen de test ERROR
[2026-09-11] Line 28: status 200 - Mensagen de test ERROR
```

---

## 💡 Conceitos Chave Aprendidos

1. **Streams vs `fs.readFile`**:
   - `fs.readFile` carrega todo o arquivo de uma só vez para a memória RAM, o que pode causar erros de estouro de memória (`Out of Memory`) em arquivos grandes (ex: > 1GB).
   - `fs.createReadStream` processa o arquivo em pequenos blocos (*chunks*), mantendo o uso da memória RAM (Heap) extremamente baixo e constante, independentemente do tamanho do arquivo.

2. **Buffers**:
   - Pedaços temporários de memória onde os dados binários das streams ficam armazenados enquanto são transmitidos ou processados.

3. **Readline Interface**:
   - Permite iterar linha a linha (`for await (const linha of leitorLinhaLinha)`) sobre uma stream de leitura com suporte transparente para quebras de linha (`crlfDelay: Infinity`).