import fs from 'fs';
import readline from 'readline';

async function  filtrarErros() {

    console.log('INICIANDO PROCESSAMENTO COM STREAM');
    exibirConsumoMemoria('Inícia');

    const streamLeitura = fs.createReadStream('servidor.log');
    const streamEscrita = fs.createWriteStream('apenas_erros.log')
    const leitorLinhaLinha = readline.createInterface({input:streamEscrita, crlfDelay: Infinity});

    let totalErros = 0;
    for await (const linha of leitorLinhaLinha){
        if (linha.includes('ERROR')){
            streamEscrita.write(linha + '\n');
            totalErros++;
        }
    }
    exibirConsumoMemoria('FIM')
    console.log(`Processamento Concluido! Quantidade de erros encontrados!: ${totalErros} linhas`)
}
function exibirConsumoMemoria(consumo){
    const memoria = process.memoryUsage();
    const rssM8 = (memoria.rss / 1024 / 1024). toFixed(2);
    const heapM8 = (memoria.heapUsed / 1024 / 1024).toFixed(2);
    console.log(`[${consumo}] RRS: ${rssM8} M8 | Heap Utilizado: ${heapM8} M8`)
}
filtrarErros();
