<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

This project is already instrumented. Create a free account at [observe.nestjs.com](https://observe.nestjs.com), add an application, and paste the generated app key and secret into the `ObserveModule.forRoot()` call in `src/app.module.ts`.

The free plan needs no payment details and covers 300,000 events a month. You can also browse the [live demo](https://www.observe-demo.nestjs.com/dashboard) first - the whole dashboard over a busy service's data, with nothing to install.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Auto-instrument your application with [NestJS Observe](https://observe.nestjs.com). Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

 🚀 Codificação Back-End

Repositório dedicado ao armazenamento, organização e versionamento dos módulos práticos desenvolvidos na disciplina de **Codificação Back-End**. A jornada engloba desde os fundamentos do ecossistema Node.js até o desenvolvimento de aplicações robustas e estruturadas com frameworks modernos como o NestJS.

---

## 🛠️ Tecnologias e Ferramentas

- **Runtime:** Node.js (v18+)
- **Linguagens:** JavaScript (ES6+ / ES Modules) e TypeScript
- **Frameworks & Libs:** NestJS, dotenv
- **Módulos Nativos:** `http`, `fs`, `readline`
- **Versionamento:** Git & GitHub (padrão Conventional Commits)

---

## 📁 Módulos do Repositório

| Módulo | Conteúdo / Tópicos Abordados | Status |
| :--- | :--- | :---: |
| **[aula01-revisao-nodejs-npm](./aula01-revisao-nodejs-npm)** | Revisão dos fundamentos do Node.js e gerenciamento de pacotes com NPM. | Concluído |
| **[aula02-modulos-commonjs-esm](./aula02-modulos-commonjs-esm)** | Dificuldades e diferenças práticas entre CommonJS (`require`) e ES Modules (`import/export`). | Concluído |
| **[aula03-streams-buffers](./aula03-streams-buffers)** | Processamento de logs de grande volume usando Streams e monitoramento de memória Heap/RSS. | Concluído |
| **[aula04-tratamento-global-excecoes](./aula04-tratamento-global-excecoes)** | Captura global de exceções não tratadas (`uncaughtException`, `unhandledRejection`). | Concluído |
| **[aula05-variaveis-ambiente-configuracao](./aula05-variaveis-ambiente-configuracao)** | Gestão segura de credenciais com `dotenv`, validação no startup e uso de `.env.example`. | Concluído |
| **[aula06-servidor-web-http](./aula06-servidor-web-http)** | Criação de servidor HTTP nativo (`http.createServer`), cabeçalhos de segurança e rotas manuais. | Concluído |
| **[aula07-fundamentos-nestjs](./aula07-fundamentos-nestjs)** | Introdução ao framework NestJS, arquitetura baseada em módulos, controllers, services e TypeScript. | Em progresso |

---

## 🚀 Como Executar os Projetos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/juliansales77/codificacao-back-end.git
   ```

2. **Acesse a pasta da aula desejada:**
   ```bash
   cd aula07-fundamentos-nestjs
   ```

3. **Instale as dependências e execute o projeto:**
   ```bash
   npm install
   npm run start:dev
   ```

---

## 📌 Padrão de Commits

O repositório segue estritamente a convenção do [Conventional Commits](https://www.conventionalcommits.org/):
- `feat`: Novas funcionalidades.
- `fix`: Correções de bugs.
- `docs`: Atualizações de documentação.
- `config` / `chore`: Ajustes de dependências, arquivos de configuração ou ferramentas.
- `build`: Alterações que afetam o sistema de build ou dependências externas.