# Orderize Web

Este repositório contém a versão Web do sistema **Orderize**, uma plataforma de gerenciamento de pedidos e estoque desenvolvida especialmente para pizzarias.

## 🚀 Visão Geral

A aplicação web é voltada para dois perfis de usuário:

- **Saloon (Atendente de salão):** Criação de pedidos, histórico, visualização de sabores e bebidas.
- **Admin (Administrador):** Gestão de sabores e bebidas, visualização de relatórios financeiros e históricos.

> ⚠️ Para rodar a aplicação corretamente, é necessário que a API e o banco de dados estejam ativos. Recomendamos utilizar o repositório [`docker-s-repo`](https://github.com/Orderize/docker-s-repo) para subir o ambiente completo com Docker.

---

## 🛠️ Como rodar localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- Yarn ou npm
- Backend e banco de dados rodando (via Docker)

### Passos para rodar:

1. Clone este repositório:

```bash
git clone https://github.com/Orderize/site.git
cd site
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor local:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse no navegador:  
`http://localhost:5173` ou conforme o terminal indicar.

---

## 📦 Backend e Banco de Dados

O backend e o banco de dados necessários para funcionamento do sistema estão configurados no repositório:

🔗 [`docker-s-repo`](https://github.com/Orderize/docker-s-repo)

---

## 🚀 Deploy da Aplicação Web

A aplicação web do Orderize pode ser implantada em diversos serviços de hospedagem, como *Vercel, **Netlify, **Render*, entre outros. Abaixo, um exemplo de deploy utilizando o Vercel:

### ✅ Deploy via Vercel

1. Acesse [https://vercel.com](https://vercel.com) e faça login (ou crie uma conta gratuita).
2. Clique em *“New Project”* e importe o repositório Orderize/site do GitHub.
3. No passo de configurações:
   - Escolha *framework = Next.js* (caso aplicável).
   - Confirme ou adicione as variáveis de ambiente se necessário (por exemplo, a URL da API).
4. Clique em *Deploy*.
5. Pronto! A aplicação será publicada em uma URL como:  
   https://orderize-web.vercel.app

### 🌐 Outras opções de deploy

- *Netlify:* Integração direta com GitHub, ideal para apps React.
- *Render / Railway:* Para apps com back e front.
- *Hospedagem própria (VPS ou cPanel):* Pode ser feita com build manual via npm run build.

---

> 💡 Lembre-se de que a aplicação depende da API e banco de dados. Em ambiente de produção, eles também devem estar publicados em um servidor acessível.

## 📄 Licença

Este projeto foi desenvolvido como entrega do Projeto Integrador da São Paulo Tech School (2025).
