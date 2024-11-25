# API Viagens com Google Maps - Encontre Corridas Facilmente com rotas rápidas e motoristas confiáveis

<p> A Proposta da API - Um Usuário irá entrar com seu Id, Origem e Destino, a API será responsável por calcular a rota mostrando a duração e o tempo estimado para chegar ao local. Além disso, um filtro será aplicado para resgatar os motoristas que se encaixam no perfil da corrida, mostrando seu Preço e sua Avaliação para uma melhor experiência do cliente, no final o usuário poderá vizualizar o histórico de seus viagens.
</p>

## Tecnologias 

<div style="display: flex; gap: 30px;">
    <img alt="NodeJs" src="./assets/node-js.png" style="width:50px;">
    <img alt="Express" src="./assets/express.png" style="width:50px;">
    <img alt="Typescript" src="./assets/typescript.png" style="width:50px;">
    <img alt="Postgresql" src="./assets/postgre.png" style="width:50px;">
    <img alt="Docker" src="./assets/docker.png" style="width:50px;">
</div>

## Versões

```bash

$ node -> v20.10.0

$ npm -> 10.2.3

$ docker -> 24.0.7

```

## Para clonar o repositório siga o passo a passo


```bash

$ git clone https://github.com/lucasnather/shopper-viagens-back-end.git

$ cd shopper-viagens-back-end

$ npm install

```

## Preencha as Variáveis de Ambiente -> pode pegar seu template em .env.example
## Crie o arquivo .env

- PORT=8080
- POSTGRES_PORT=5432
- POSTGRES_USERNAME=username
- POSTGRES_PASSWORD=password
- POSTGRES_DATABASE=viagens
- GOOGLE_API_KEY=sua google api key

DATABASE_URL="postgresql://username:password@db:5432/viagens?schema=public"

### Obs: Se você alterar alguma variável, certifique-se de alterar também no DATABASE_URL 

## Imagem da aplicação com Docker

```bash

$ docker-compose up --build -d

# No Terminal do Docker rode este comando para executar as migrations

$ npx prisma migrate dev # roda as migrations para criar as tabelas

$ npm run seed # cria Customers e Drivers para testes na aplicação

$ npx prisma studio # Verifique as tabelas com seus valores criados

```

## Rodar testes Unitários


```bash

$ npm t

```

## Acesse a Documentação com Swagger -> http://localhost:8080/docs

## Aprendizado

<p>Nesta aplicação aprendi como usar bibliotecas do Goolgle maps e como consumí-las para gerar todos os dados necessários para verificar a rota, também aprendi a como conteinerizar minha aplicação de uma forma mais simples</p> 

## Pontos de melhoria

1. Login para o usuário -> Resgatar seu Id apenas se autenticando
2. Status da Entrega -> Poder ter informações de quaois corridas estão em Andamento, Finalizadas ou Canceladas
3. Login para o motorista

