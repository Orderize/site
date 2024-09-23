# 🍕 Pizzaria Backoffice - Frontend

Este é o repositório do **frontend** do sistema de **Backoffice de Pizzaria**, que permite gerenciar pedidos, cardápios, sabores de pizza, e acompanhar o status dos pedidos de forma interna. O projeto é desenvolvido utilizando **React** e está conectado a um backend implementado em **Java Spring Boot**.

---

## 📋 Visão Geral do Projeto

Este front-end é responsável por fornecer uma interface amigável para os funcionários da pizzaria, permitindo gerenciar as operações internas de forma eficiente, tais como:
- Gerenciamento de pedidos.
- Controle de sabores e tamanhos de pizzas.
- Acompanhamento de status dos pedidos.
- Edição do cardápio.

O sistema é parte de um ecossistema maior, onde o **backend** é responsável por fornecer os dados e realizar operações de negócio, enquanto o **frontend** interage com a API REST do backend para exibir e enviar informações.

---

## 🛠️ Tecnologias Utilizadas

### Frontend (este repositório):
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Para requisições HTTP e comunicação com o backend.
- **React Router**: Gerenciamento de rotas e navegação.
- **CSS Modules / SASS**: Estilos personalizados para cada componente.
- **Componentização**: Utilização de componentes reutilizáveis para manter o código modular e limpo.

### Backend (separado):
- **Java Spring Boot**: O backend está implementado em Java com o framework Spring Boot, responsável por gerenciar a lógica de negócio e fornecer as APIs REST.
- **Banco de Dados**: MySQL/PostgreSQL (configurado no backend).
- **Autenticação**: JWT (JSON Web Tokens) para autenticação segura entre o front e o back.

---

## ⚙️ Funcionalidades

### Funcionalidades Disponíveis:
- **Dashboard**: Visão geral dos pedidos em andamento, status, e informações de vendas.
- **Gerenciamento de Pedidos**: Visualização, edição e alteração de status de pedidos.
- **Gerenciamento de Sabores**: Adicionar, editar e remover sabores de pizza.
- **Gerenciamento de Cardápio**: Atualizar preços, tamanhos e descrições dos itens disponíveis.
- **Autenticação de Usuários**: Acesso restrito por login e senha, com autenticação via JWT.

---

## 🚀 Configuração do Ambiente

### Pré-requisitos:

- **Node.js**: Versão >= 14.x
- **npm** ou **yarn**

### Passos para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/pizzaria-backoffice-frontend.git
   cd pizzaria-backoffice-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. **Crie o arquivo `.env` para configurar a URL do backend:**
   ```bash
   REACT_APP_API_URL=http://localhost:8080/
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   ou
   ```bash
   yarn start
   ```

5. **Acesse o frontend no navegador:**
   - O servidor de desenvolvimento estará rodando em: `http://localhost:8080`

---

## 🌐 Integração com o Backend

Este front-end depende de um backend que expõe uma **API REST**. Para o funcionamento completo, certifique-se de que o backend em **Java Spring Boot** está rodando corretamente.

- **URL da API**: O endereço da API é configurado no arquivo `.env` usando a variável `REACT_APP_API_URL`. No ambiente de desenvolvimento, por padrão, ele aponta para `http://localhost:8080/`.

- **Autenticação**: Todas as requisições protegidas são feitas com um **token JWT**, que é armazenado localmente e anexado a cada requisição HTTP.

---

## 📂 Estrutura de Pastas

```bash
pizzaria-backoffice-frontend/
├── public/               # Arquivos estáticos (imagens, index.html)
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── components/       # Componentes reutilizáveis (Navbar, Footer, etc.)
│   ├── pages/            # Páginas principais da aplicação (Pedidos, Cardápio, etc.)
│   ├── services/         # Arquivos para comunicação com a API (axios config)
│   ├── styles/           # Estilos globais ou CSS Modules
│   ├── App.jsx           # Componente principal
│   └── index.jsx         # Ponto de entrada da aplicação
└── .env                  # Configuração de variáveis de ambiente
```

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar **pull requests**. Para maiores detalhes, siga o guia de contribuição.

---

## 📝 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

