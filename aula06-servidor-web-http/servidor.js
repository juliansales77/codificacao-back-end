import http from 'http';

const servidor = http.createServer((req, res) =>{
    
    console.log(`[LOG Método recebido: ${req.method} | ${req.url}]`);
    
    const cabecalhoPadrao = {
        'X-Content-Type-Options' : 'nosniff',
        'X-frame-Options' : 'DENY',
    };
    
    if(req.url === '/status'){
        res.writeHead(200, {
            ...cabecalhoPadrao, 
            'content-Type':'application/json'
        });
        res.end(JSON.stringify({servidor:'Online'}));
    }else{
        res.writeHead(404,{
            ...cabecalhoPadrao,
            'Content-Type':'Application/json'
        });
        res.end(JSON.stringify({erro: 'Pagina não encontrada'}));
    }
});
servidor.listen(3000, () =>{
    console.log('Sentinela ativo na porta 3000');
});

