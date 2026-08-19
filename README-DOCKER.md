# 🐳 Guia de Inicialização com Docker Desktop - Brasa Burguer

Este guia explica detalhadamente como construir, configurar e executar o aplicativo do **Brasa Burguer** localmente utilizando o **Docker Desktop**.

O projeto já está configurado com build multi-stage e suporte ao modo standalone do Next.js, garantindo uma imagem extremamente leve, rápida e otimizada.

---

## 🛠️ Pré-requisitos

1. **Docker Desktop** instalado e em execução em sua máquina.
   - [Baixar Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Git (opcional, para controle de versão).

---

## 🚀 Passo a Passo para Execução

### 1. Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto (mesmo diretório deste arquivo) para que o Docker possa carregar suas chaves do Supabase e do Gemini:

Você pode copiar o exemplo do `.env.example` e preenchê-lo:

```env
# Chave da API do Gemini (Necessária para IA)
GEMINI_API_KEY="SUA_CHAVE_GEMINI_AQUI"

# URL do Aplicativo (Pode ser local ou produção)
APP_URL="http://localhost:3000"

# Configurações do WhatsApp para receber pedidos
WHATSAPP_NUMBER="5533998646238"

# Chave Pix padrão exibida para o cliente
PIX_KEY="brasaburguer.pix@gmail.com"

# Integração com Banco de Dados Supabase (Muito Importante!)
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_ANON_KEY="sua-chave-anonima-publica-do-supabase"
```

---

### 2. Executar com Docker Compose (Método Recomendado)

O Docker Compose gerencia a criação da imagem e a inicialização do container de forma simplificada.

Abra o terminal na pasta raiz do projeto e execute:

```bash
docker compose up --build
```

**O que este comando faz:**
- Lê o arquivo `docker-compose.yml`.
- Constrói a imagem Docker baseada no `Dockerfile` otimizado.
- Inicializa o container mapeando a porta **3000** do seu computador para a porta **3000** interna do container.
- Carrega as variáveis configuradas no arquivo `.env`.

Após a conclusão da construção, o terminal indicará que o servidor está rodando. Acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

Para parar o container de forma limpa, basta usar `Ctrl + C` no terminal ou executar:

```bash
docker compose down
```

---

### 3. Método Alternativo: Executar apenas com comandos Docker

Se preferir não usar o Docker Compose, você pode construir e rodar a imagem manualmente pelo terminal:

**Construir a imagem:**
```bash
docker build -t brasa-burguer-app .
```

**Executar o container:**
```bash
docker run -p 3000:3000 --env-file .env --name brasa-burguer brasa-burguer-app
```

---

## 💡 Dicas e Resolução de Problemas

- **Mudanças no Código:** Se você fizer alterações no código-fonte e quiser vê-las refletidas, lembre-se de rodar novamente o comando com a flag `--build` para atualizar a imagem Docker:
  ```bash
  docker compose up --build
  ```
- **Porta em Uso:** Caso a porta `3000` já esteja sendo usada por outra aplicação em seu computador, você pode alterá-la facilmente no arquivo `docker-compose.yml`. Por exemplo, para usar a porta `8080`, mude a seção `ports` para:
  ```yaml
  ports:
    - "8080:3000"
  ```
  O acesso local passará a ser `http://localhost:8080`.
