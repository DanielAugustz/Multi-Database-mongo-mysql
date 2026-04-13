# Prova1 — API de contatos (MySQL + MongoDB)

Guia em **passos**: como subir tudo no Docker, usar a API e abrir cada base na linha de comandos.

---

## 1. Arrancar o Docker e o projeto

1. Abre o **Docker Desktop** e espera ficar a correr.
2. No terminal, vai à pasta do projeto e corre:

```bash
docker compose up --build
```

3. Espera até aparecer algo como **API no ar → http://localhost:3000**.
4. No navegador abre **http://localhost:3000** — vês um JSON com os caminhos da API MySQL e Mongo.

Para parar: `Ctrl+C` no terminal, ou `docker compose down`.

---

## 2. Usar a API (criar, listar, etc.)

A lógica é a **mesma** para MySQL e Mongo; só muda o **URL**.

### MySQL

- Base da API: `http://localhost:3000/api/mysql/contatos`
- **Ver todos:** navegador ou `GET` nesse URL.
- **Ver um:** `GET` …/contatos/`id`
- **Criar:** `POST` …/contatos com JSON `{"nome":"...","telefone":"..."}`
- **Alterar:** `PUT` …/contatos/`id` com o mesmo JSON
- **Apagar:** `DELETE` …/contatos/`id`

`nome` e `telefone` são obrigatórios ao criar ou atualizar.
---

## 3. Abrir o MySQL “à mão” (cliente no Docker)

Com o `docker compose` a correr, noutro terminal:

```powershell
docker exec -it mysql mysql -u root -proot daniel
```

- `mysql` é o nome do container do MySQL no `docker-compose`.
- Utilizador: `root`, palavra-passe: `root`, base: `daniel`.

Se pedir password (`-p` sem password no comando), escreve: `root`.

Dentro do cliente (`mysql>`):

```sql
USE daniel;
SELECT * FROM contatos;
INSERT INTO contatos (nome, telefone) VALUES ('João', '923000000');
```

Para sair: `exit`.

---

## 4. Abrir o MongoDB “à mão” (mongosh no Docker)

Com o `docker compose` a correr:

```powershell
docker exec -it mongodb mongosh daniel
```

- `mongodb` é o nome do container do Mongo no `docker-compose`.
- `daniel` é a base de dados (a mesma que a app usa).

Dentro do `mongosh`:

```javascript
show collections
db.contatos.insertOne({ nome: "Ana", telefone: "912000000" })
db.contatos.find()
```

Para sair: `exit` ou `Ctrl+D`.



