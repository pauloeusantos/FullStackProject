# FullStack Project

## Visão Geral

Este projeto é uma aplicação full-stack composta por um servidor back-end e um cliente front-end. O back-end é construído com Node.js e Express, utilizando Sequelize para interagir com um banco de dados SQLite. O front-end é desenvolvido com Vite e utiliza Tailwind CSS para estilização.

## Estrutura do Projeto

### Back-End

- **server/index.js**: Arquivo principal que inicializa o servidor Express e configura as rotas.
- **server/routes/productRoutes.js**: Define as rotas para operações relacionadas a produtos.
- **server/models/Product.js**: Define o modelo de dados para os produtos utilizando Sequelize.
- **server/bd/bd.js**: Configuração do Sequelize para conectar-se ao banco de dados SQLite.

### Front-End

- **product/src/**: Contém os componentes principais, estilos e lógica da aplicação.
- **product/public/**: Arquivos estáticos que são servidos diretamente.
- **product/tailwind.config.js**: Configuração do Tailwind CSS para estilização.

## Funcionalidades

### API de Produtos (Back-End)

- **GET /api/products**: Retorna uma lista de todos os produtos.
- **POST /api/products**: Cria um novo produto com os dados fornecidos no corpo da requisição.
- **PUT /api/products/:id**: Atualiza um produto existente com base no ID fornecido.
- **DELETE /api/products/:id**: Remove um produto com base no ID fornecido.

### Interface de Usuário (Front-End)

- Visualizar a lista de produtos.
- Adicionar novos produtos.
- Editar produtos existentes.
- Excluir produtos.

## Configuração e Execução

### Pré-requisitos

- Node.js instalado.
- npm ou yarn para gerenciar pacotes.

### Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

### Back-End

1. Navegue até o diretório do servidor:
   ```bash
   cd FullStackProject/server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

### Front-End

1. Navegue até o diretório do produto:
   ```bash
   cd FullStackProject/product
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

### Executando o Projeto

#### Back-End

1. Inicie o servidor:
   ```bash
   node index.js
   ```
2. O servidor estará rodando em `http://localhost:3001`.

#### Front-End

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação.

## Uso

Você pode usar ferramentas como Thunder Client, Postman ou Insomnia para testar as rotas da API e interagir com a aplicação através da interface web.