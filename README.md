# API de Gerenciamento de Clientes

Esta aplicação é uma API simples para gerenciar informações de clientes. Foi desenvolvida utilizando Node.js, Express e MongoDB.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd <diretorio-do-projeto>
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure a string de conexão com o MongoDB no código (arquivo `index.js`):
   ```javascript
   mongoose.connect('mongodb+srv://<usuario>:<senha>@<cluster>/<nome-do-banco>?retryWrites=true&w=majority&appName=node-API');
   ```
5. Inicie o servidor:
   ```bash
   node index.js
   ```
6. O servidor estará rodando em `http://localhost:3000`.

## Rotas

### Criar um novo cliente
- **POST /**
- **Descrição:** Adiciona um novo cliente no banco de dados.
- **Body:**
  ```json
  {
    "name": "Nome do Cliente",
    "email": "email@exemplo.com",
    "phone": "123456789",
    "address": "Endereço do Cliente"
  }
  ```
- **Resposta:**
  ```json
  {
    "_id": "id-gerado",
    "name": "Nome do Cliente",
    "email": "email@exemplo.com",
    "phone": "123456789",
    "address": "Endereço do Cliente",
    "__v": 0
  }
  ```

### Listar todos os clientes
- **GET /**
- **Descrição:** Retorna a lista de todos os clientes cadastrados.
- **Resposta:**
  ```json
  [
    {
      "_id": "id-do-cliente",
      "name": "Nome do Cliente",
      "email": "email@exemplo.com",
      "phone": "123456789",
      "address": "Endereço do Cliente",
      "__v": 0
    }
  ]
  ```

### Atualizar um cliente
- **PUT /:id**
- **Descrição:** Atualiza os dados de um cliente existente.
- **Parâmetros:**
  - `id` (String): ID do cliente.
- **Body:**
  ```json
  {
    "name": "Novo Nome",
    "email": "novoemail@exemplo.com",
    "phone": "987654321",
    "address": "Novo Endereço"
  }
  ```
- **Resposta:**
  ```json
  {
    "_id": "id-do-cliente",
    "name": "Novo Nome",
    "email": "novoemail@exemplo.com",
    "phone": "987654321",
    "address": "Novo Endereço",
    "__v": 0
  }
  ```

### Deletar um cliente
- **DELETE /:id**
- **Descrição:** Remove um cliente do banco de dados.
- **Parâmetros:**
  - `id` (String): ID do cliente.
- **Resposta:**
  ```json
  {
    "_id": "id-do-cliente",
    "name": "Nome do Cliente",
    "email": "email@exemplo.com",
    "phone": "123456789",
    "address": "Endereço do Cliente",
    "__v": 0
  }
  ```

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB

## Licença
Este projeto está licenciado sob os termos da [MIT License](LICENSE).
