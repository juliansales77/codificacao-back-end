# 🚀 Aula 02: Revisão de Node.js e Estruturas JSON

![Node.JS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5E5E?style=for-the-badge&logo=json&logoColor=white)

Este módulo apresenta uma revisão prática sobre manipulação e modelagem de objetos **JSON** no ecossistema Node.js, cobrindo o uso de objetos aninhados, arrays de objetos, tipos numéricos, datas e listas dinâmicas para representação de dados de domínio do mundo real (sistemas escolares, e-commerce e redes sociais).

---

## 📂 Arquivos de Exemplos JSON

### 1. `aluno-escola.json`
Representa os dados cadastrais, curso, endereço completo e o boletim de disciplinas de um estudante:

```json
{
  "nome": "Lucas Almeida",
  "nomeSocial": "",
  "matricula": "0001",
  "dataNascimento": "2002-05-14",
  "curso": "Desenvolvimento de Sistemas",
  "Disciplinas": [
    { "nome": "Banco de dados", "nota": 9.5 },
    { "nome": "Desenvolvimento WEB", "nota": 8.8 }
  ],
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Jardim Felicidade",
    "cidade": "Macapá",
    "estado": "Amapá",
    "cep": "6890030"
  }
}
```

---

### 2. `produto-loja-notebook.json`
Mapeia um produto de e-commerce contendo especificações técnicas aninhadas e tags de busca:

```json
{
  "nome": "Notebook Asus Tuf Gaming A15 fn",
  "categoria": "Informatica",
  "preco": 4999.99,
  "quantidade": 15,
  "especificacoes": {
    "ram": "16GB",
    "processador": "AMD Ryzen 7 7465hs",
    "armazenamento": "512 GB SSD"
  },
  "tags": [
    "Notebook",
    "Gamer",
    "Jogos"
  ]
}
```

---

### 3. `rede-social.json`
Modelagem de uma publicação de rede social contendo lista de comentários e métricas de engajamento:

```json
{
  "titulo": "Rede Social",
  "autor": "João Pedro",
  "data": "2026-10-20",
  "comentarios": [
    {
      "autor": "Maria Silva",
      "texto": "Ótimo post!",
      "data": "2026-10-20",
      "curtidas": 10
    }
  ]
}
```

---

### 4. `sistema-escolar.json`
Estrutura completa das ações de uma entidade **Professor**, contemplando lecionação de aulas, organização de diário de classe/frequência e atribuição de notas de avaliações:

```json
{
  "entidade": "Professor",
  "identificacao": {
    "idProfessor": "P-045",
    "nome": "Roberto Carlos",
    "disciplina": "Matemática"
  },
  "acoes": {
    "ensina": {
      "funcao": "Explicar matéria, tirar dúvidas, mostrar como fazer",
      "registroDeAulas": [
        {
          "data": "2026-10-20",
          "turma": "1º Ano A",
          "conteudoLecionado": "Equações de 2º Grau e resolução de dúvidas"
        }
      ]
    },
    "organiza": {
      "funcao": "Passar atividade, prova, trabalho e gerenciar presença",
      "atividadesPlanejadas": [
        {
          "tipo": "Trabalho",
          "titulo": "Lista de Exercícios Práticos",
          "dataEntrega": "2026-10-25"
        }
      ],
      "diarioDeClasse": {
        "data": "2026-10-20",
        "turma": "1º Ano A",
        "alunosAusentes": ["0012", "0034"]
      }
    },
    "avalia": {
      "funcao": "Corrigir provas e dar notas",
      "notasAtribuidas": [
        {
          "idAtividade": "A-102",
          "matriculaAluno": "0001",
          "nota": 8.5,
          "comentarioCorrecao": "Ótimo raciocínio lógico."
        }
      ]
    }
  }
}
```