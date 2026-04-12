# Seguros Promo - Frontend

## Pré-requisitos

- [NVM](https://github.com/nvm-sh/nvm) instalado
- Acesso ao repositório

## Como rodar o projeto

### 1. Instale a versão correta do Node

O projeto utiliza um arquivo `.nvmrc` para definir a versão do Node. O comando abaixo faz o download (se necessário) e ativa a versão correta automaticamente:
```bash
nvm i
```

### 2. Instale as dependências
```bash
npm i
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de staging como base para o ambiente local:
```bash
cp .env.staging .env.local
```

O arquivo `.env.local` gerado terá o seguinte conteúdo:
> VITE_BASE_API_URL=

Ajuste os valores se necessário. O `VITE_BASE_API_URL` deve apontar para o endereço da API rodando localmente.

### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou a porta configurada no `vite.config.ts`).
