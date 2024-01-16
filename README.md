# Fincheck

Este projeto serve como um backend para a aplicação [Fincheck](https://fincheck-web-kappa.vercel.app/), essa API foi criada utilizando [TypeScript](https://www.typescriptlang.org/docs/) e [NestJS](https://nestjs.com/), além do uso de [Prisma](https://www.prisma.io/) como ORM para gerencias as interaçõs com o banco de dados PostgresSQL.

## Tecnologias
- TypeScript
- NestJS
- PostgreSQL

Utilizar essas tecnologias proporciona muitas vantagens na construção de uma API. TypeScript oferece tipagem estática para maior segurança e IntelliSense avançado, enquanto o NesteJS traz apdrões de arquitetura sólidos, injeção de dependência e uma abstração simplificada de rotas, facilitando o desenvolvimento de APIs robustas e modulares.

## Features desta aplicação
- Login/Signin de usuário;
- Listagem de categorias;
- Criação, deleção, atualização e listagem de contas bancárias;
- Criação, deleção, atualização e listagem de transações;

## Instalação

Clone o repositório e execute os seguintes comandos:

```bash
# Clonar o repositório
git@github.com:pedrobadm7/api-fincheck.git

# Entrar no diretório do projeto
cd api-fincheck

# Instalação de dependências
yarn install / npm install
```

### Criando uma imagem do PostgresSQL utilizando Docker

O Docker é crucial para rodar o PostgreSQL devido à sua capacidade de criar contêineres isolados, garantindo consistência, portabilidade e eficiência na gestão de recursos. Essa abordagem simplifica a configuração do PostgreSQL, promove a reprodutibilidade do ambiente e facilita a implantação consistente em diferentes ambientes de desenvolvimento e produção.

```bash

# Baixe a imagem do PostgreSQL
docker pull postgres

# Inicie um container PostgreSQL
docker run -d --name meu-postgres -e POSTGRES_PASSWORD=sua-senha -p 5432:5432 postgres

# Verifique o status do container
docker ps

# Comando para parar o container
docker stop meu-postgres

# Iniciar o container
docker start meu-postgres

Após iniciar o container, basta rodar a API com yarn start:dev
```
## Configuração

```env
DATABASE_URL=
JWT_SECRET=
```

Este projeto é baseado em um projeto do [JStack](https://jstack.com.br/)

- <b>Mateus Silva</b> - Trabalho inicial [maateusilva](https://github.com/maateusilva)
- <b>Pedro Barros Silva</b> - Aprimoramento [pedrobadm7](https://github.com/pedrobadm7)

---

⌨️ com ❤️ por [Pedro Barros Silva]([https://gist.github.com/lohhans](https://github.com/pedrobadm7)https://github.com/pedrobadm7) 😊

