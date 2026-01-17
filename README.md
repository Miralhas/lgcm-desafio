# LGCM Desafio

https://github.com/user-attachments/assets/b898da56-cf5e-46d4-9e50-a2fc3329b3dc

## Requisitos

- Node.js 24+
- PostgreSQL 17+
- Docker e Docker Compose (opcional)

## Instalação e Execução

### Com Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/Miralhas/lgcm-desafio.git
   cd lgcm-desafio
   ```

2. Inicie os containers:
   ```bash
   docker compose up -d --build
   ```
   *Nota: O build pode levar alguns minutos.*

3. Para parar a aplicação:
   ```bash
   docker compose down
   ```

***

### Sem Docker

#### Server

1. Clone o repositório:
   ```bash
   git clone https://github.com/Miralhas/lgcm-desafio.git
   cd lgcm-desafio/server
   ```

2. Configure as variáveis de ambiente:
   Renomeie o arquivo `.env.example` para `.env`.
   
   Abra o arquivo `.env` e adicione a URL do banco de dados:
   ```
   DATABASE_URL="postgres://username:password@localhost:5434/postgres"
   ```

3. Instale as dependências e execute as migrações:
   ```bash
   npm install
   npm run db:generate 
   npm run db:migrate
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

#### Client

1. Acesse o diretório do cliente:
   ```bash
   cd lgcm-desafio/client
   ```

2. Configure as variáveis de ambiente:
   Renomeie o arquivo `.env.example` para `.env.local`.
   
   Abra o arquivo `.env.local` e adicione a URL do servidor:
   ```
   VITE_API_URL="http://localhost:3000"
   ```
   *Nota: Verifique a porta correta verificando o console ao iniciar o servidor.*

3. Instale as dependências e inicie a aplicação:
   ```bash
   npm install
   npm run dev
   ```
