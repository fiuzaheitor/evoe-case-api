# Evoé Case - API de usuários.

Este projeto complementa o frontend da Evoé

## 🚀 Tecnologias Utilizadas

- **Backend:** Node.js, Express
- **Banco de Dados:** SQL
- **Docker:** Para configurar e rodar o projeto facilmente

## 📥 Como Clonar o Projeto

Para clonar o repositório, execute o seguinte comando:

```bash
git clone https://github.com/fiuzaheitor/evoe-case-api.git
```

## 📦 Instalação de Dependências

Entre no diretório do projeto e instale as dependências:

```bash
cd evoe-case-api
npm install
```

## 🛠️ Configurando o Docker

Este projeto utiliza Docker para facilitar a configuração do ambiente. Certifique-se de ter o Docker instalado e execute o seguinte comando para construir e rodar o projeto:

```bash
docker-compose --build
```

## 🌐 Endereços da API

# Endpoints da API

Após iniciar o Docker, a API estará disponível no endereço configurado `http://localhost:3000`.

## Endpoints

### 1. `GET /users`
- **Descrição**: Retorna todos os usuários registrados no sistema.

### 2. `GET /users/:id`
- **Descrição**: Retorna os dados de um único usuário baseado no ID fornecido.
- **Parâmetros**:
  - `id`: ID do usuário.

### 3. `POST /users`
- **Descrição**: Cria um novo usuário no sistema com as informações fornecidas no corpo da requisição.
- **Corpo da requisição**:
    ```json
    {
      "name": "Novo Usuário",
      "email": "novo@usuario.com",
      "password": "senha"
    }
    ```

### 4. `POST /users/login`
- **Descrição**: Realiza o login de um usuário, verificando suas credenciais.
- **Corpo da requisição**:
    ```json
    {
      "email": "usuario@email.com",
      "password": "senha"
    }
    ```

### 5. `PUT /users/:id`
- **Descrição**: Atualiza os dados de um usuário existente com base no ID fornecido.
- **Parâmetros**:
  - `id`: ID do usuário.
- **Corpo da requisição**:
    ```json
    {
      "name": "João Atualizado",
      "email": "joao_atualizado@email.com",
      "password": "nova_senha"
    }
    ```



## 📄 Licença

Este projeto é apenas para fins de avaliação técnica.
