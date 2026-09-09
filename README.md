# MedClinic API - Etapa 1: Autenticação e Autorização

## 📋 Descrição do Projeto

A **MedClinic API** é uma API REST desenvolvida para gerenciar uma clínica médica de pequeno porte. Esta primeira etapa implementa a base de autenticação e autorização do sistema, responsável por gerenciar o acesso de usuários através de mecanismos seguros de autenticação JWT e autorização baseada em perfis (RBAC).

### Escopo desta Etapa

Nesta etapa, implementa-se **exclusivamente**:

- ✅ Autenticação de usuários via login com emissão de token JWT
- ✅ Autorização baseada em perfis de usuário (RBAC)
- ✅ Cadastro de usuários com validação de dados
- ✅ Criptografia de senhas com bcrypt
- ✅ Middleware de autenticação e autorização
- ✅ Tratamento centralizado de erros

**Não estão inclusos nesta etapa:**
- ❌ Gerenciamento de especialidades
- ❌ Gerenciamento de médicos
- ❌ Gerenciamento de pacientes
- ❌ Gerenciamento de consultas
- ❌ Gerenciamento de relatórios

Essas funcionalidades serão implementadas em etapas futuras, utilizando como base a estrutura desenvolvida nesta etapa.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | v16+ | Runtime JavaScript |
| **TypeScript** | ^5.3.3 | Linguagem com tipagem estática |
| **Express.js** | ^4.18.2 | Framework web |
| **PostgreSQL** | v12+ | Banco de dados relacional |
| **TypeORM** | ^0.3.17 | ORM para manipulação do banco |
| **JWT (jsonwebtoken)** | ^9.0.2 | Autenticação com tokens |
| **bcrypt** | ^5.1.1 | Criptografia de senhas |
| **CORS** | ^2.8.5 | Compartilhamento de recursos entre origens |
| **dotenv** | ^16.3.1 | Gerenciamento de variáveis de ambiente |

---

## 📦 Pré-requisitos

Antes de configurar e executar a aplicação, certifique-se de ter instalado:

### Obrigatório
- **Node.js** (v16 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes (incluído com Node.js)
- **PostgreSQL** (v12 ou superior) - [Download](https://www.postgresql.org/)
- **Git** - Sistema de controle de versão

### Opcional (mas recomendado)
- **Postman**, **Insomnia** ou **Thunder Client** - Cliente HTTP para testes de API
- **pgAdmin** ou **DBeaver** - Gerenciador gráfico de banco de dados

---

## ⚙️ Configuração do Banco de Dados

### 1. Criar o Banco de Dados

Conecte-se ao PostgreSQL e execute:

```sql
-- Conectar como superusuário
psql -U postgres

-- Criar o banco de dados
CREATE DATABASE medclinic_db;

-- Conectar ao banco criado
\c medclinic_db

-- Sair
\q
```

Alternativamente, usando comandos diretos:

```bash
# Linux/Mac
createdb medclinic_db

# Windows (via pgAdmin ou Power Shell)
psql -U postgres -c "CREATE DATABASE medclinic_db;"
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
NODE_ENV=development
PORT=3000

# Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=medclinic_db

# JWT - Autenticação
JWT_SECRET=sua_chave_secreta_super_segura_mude_isto_em_producao
JWT_EXPIRATION=24h
```

⚠️ **Importante:** 
- Nunca coloque o arquivo `.env` em controle de versão
- Use uma chave JWT forte em produção
- Altere `DB_PASSWORD` conforme sua instalação do PostgreSQL

---

## 🚀 Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/medclinic-api.git
cd medclinic-api
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Executar o build 

```bash
npm run build
```

### 4. Executar as Migrations

As migrations criarão a tabela `users` e todas as estruturas necessárias:

```bash
npm run migration:run
```

**Saída esperada:**
```
Migration CreateUsersTable1704067200000 has been executed successfully.
```

### 5. Executar a Aplicação

#### Modo Desenvolvimento

```bash
npm run dev
```

#### Modo Build + Produção

```bash
# Compilar TypeScript
npm run build

# Executar servidor compilado
npm start
```

**Saída esperada:**
```
✅ Database connection established
✅ Server running on http://localhost:3000
📚 API Documentation:
   POST   /auth/register       - Register a new user
   POST   /auth/login          - Login and get JWT token
   GET    /auth/users/me       - Get logged user profile
   GET    /auth/admin/ping     - Admin only endpoint
```

---

## 📁 Arquitetura do Projeto e Estrutura de Pastas

A aplicação segue uma **arquitetura MVC organizada em camadas**, promovendo separação de responsabilidades:

```
medclinic-api/
│
├── src/
│   ├── server.ts                          # Entry point da aplicação
│   │
│   ├── database/
│   │   └── data-source.ts                 # Configuração TypeORM e DataSource
│   │
│   ├── entities/
│   │   └── user.ts                        # Entidade User com decorators TypeORM
│   │
│   ├── repositories/
│   │   └── userRepository.ts              # CRUD de usuários via TypeORM
│   │
│   ├── services/
│   │   ├── userService.ts                 # Lógica de negócio de usuários
│   │   └── authService.ts                 # Lógica de autenticação
│   │
│   ├── controllers/
│   │   └── authController.ts              # Controladores HTTP
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts              # Validação JWT
│   │   ├── authorizationMiddleware.ts     # Controle RBAC
│   │   └── errorHandler.ts                # Tratamento centralizado de erros
│   │
│   ├── routes/
│   │   └── authRoutes.ts                  # Definição de endpoints
│   │
│   ├── utils/
│   │   ├── jwt.ts                         # Utilitários de JWT
│   │   └── password.ts                    # Utilitários de criptografia bcrypt
│   │
│   └── migrations/
│       └── 1704067200000-CreateUsersTable.ts  # Migration TypeORM
│
├── dist/                                   # Código compilado (gerado com npm run build)
├── node_modules/                           # Dependências (gerado com npm install)
│
├── .env                                    # Variáveis de ambiente (não committar)
├── .env.example                            # Template de variáveis
├── .gitignore                              # Arquivos ignorados no Git
├── package.json                            # Dependências e scripts npm
├── package-lock.json                       # Lock de dependências
├── tsconfig.json                           # Configuração TypeScript
├── ormconfig.json                          # Configuração TypeORM
└── README.md                               # Este arquivo
```

### Responsabilidades das Camadas

| Camada | Responsabilidade | Arquivos |
|--------|------------------|----------|
| **Server/Main** | Iniciar Express, conectar BD, registrar rotas | `server.ts` |
| **Routes** | Definir endpoints e middlewares | `routes/authRoutes.ts` |
| **Middlewares** | Interceptar requisições (autenticação, autorização, erros) | `middlewares/*` |
| **Controllers** | Receber requisições, invocar serviços, retornar respostas | `controllers/authController.ts` |
| **Services** | Regras de negócio, validações, coordenação | `services/*` |
| **Repositories** | Comunicação com PostgreSQL via TypeORM | `repositories/userRepository.ts` |
| **Entities** | Representar tabelas do banco com decorators TypeORM | `entities/user.ts` |
| **Database** | Configurar conexão TypeORM | `database/data-source.ts` |
| **Utils** | Funções auxiliares reutilizáveis | `utils/*` |

---

## 📚 Documentação dos Endpoints

### Base URL
```
http://localhost:3000
```

Todos os endpoints de autenticação utilizam o prefixo `/auth`.

---

### 1️⃣ POST /auth/register - Registrar Novo Usuário

**Descrição:** Cria um novo usuário no sistema com validação de dados.

**Método:** `POST`

**URL:** `http://localhost:3000/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Parâmetros (Body - JSON):**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `name` | string | ✅ Sim | Nome do usuário (máx. 255 caracteres) |
| `email` | string | ✅ Sim | E-mail único do usuário (máx. 255 caracteres) |
| `password` | string | ✅ Sim | Senha do usuário (mínimo 6 caracteres) |
| `role` | string | ❌ Não | Perfil: `admin` ou `attendant` (padrão: `attendant`) |

**Validações:**
- ✓ Todos os campos obrigatórios devem ser preenchidos
- ✓ E-mail deve estar em formato válido
- ✓ E-mail não pode ser duplicado
- ✓ Senha deve ter no mínimo 6 caracteres
- ✓ Senha é armazenada como hash bcrypt, nunca em texto puro

**Exemplo de Requisição:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123456",
    "role": "attendant"
  }'
```

**Resposta 201 (Sucesso):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "attendant",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Respostas de Erro:**

❌ **400 Bad Request** - Dados inválidos:
```json
{
  "error": "Invalid email format",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

❌ **409 Conflict** - E-mail já existe:
```json
{
  "error": "Email already registered",
  "statusCode": 409,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2️⃣ POST /auth/login - Login e Obter Token JWT

**Descrição:** Autentica um usuário e retorna um token JWT para requisições subsequentes.

**Método:** `POST`

**URL:** `http://localhost:3000/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Parâmetros (Body - JSON):**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `email` | string | ✅ Sim | E-mail do usuário |
| `password` | string | ✅ Sim | Senha do usuário |

**Validações:**
- ✓ E-mail e senha são obrigatórios
- ✓ Senha é comparada com o hash armazenado via bcrypt
- ✓ Em caso de falha, retorna erro genérico (não especifica qual campo)

**Exemplo de Requisição:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123456"
  }'
```

**Resposta 200 (Sucesso):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImVtYWlsIjoiam9hb0BleGFtcGxlLmNvbSIsInJvbGUiOiJhdHRlbmRhbnQiLCJpYXQiOjE3MDUzMjA2MDAsImV4cCI6MTcwNTQwNzAwMH0.xxx",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "attendant"
  }
}
```

**Respostas de Erro:**

❌ **401 Unauthorized** - Credenciais inválidas:
```json
{
  "error": "Invalid credentials",
  "statusCode": 401,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 3️⃣ GET /auth/users/me - Obter Perfil do Usuário Autenticado

**Descrição:** Retorna os dados do usuário autenticado baseado no token JWT fornecido. Requer autenticação.

**Método:** `GET`

**URL:** `http://localhost:3000/auth/users/me`

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Parâmetros:** Nenhum (token vem no header `Authorization`)

**Exemplo de Requisição:**

```bash
curl -X GET http://localhost:3000/auth/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Resposta 200 (Sucesso):**

```json
{
  "message": "User profile retrieved",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "attendant",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Respostas de Erro:**

❌ **401 Unauthorized** - Token ausente:
```json
{
  "error": "Missing authorization header",
  "statusCode": 401,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

❌ **401 Unauthorized** - Token inválido ou expirado:
```json
{
  "error": "Invalid or expired token",
  "statusCode": 401,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 4️⃣ GET /auth/admin/ping - Verificar Acesso de Administrador (RBAC)

**Descrição:** Endpoint protegido acessível apenas por usuários com perfil `admin`. Demonstra o funcionamento do controle de acesso baseado em perfis (RBAC).

**Método:** `GET`

**URL:** `http://localhost:3000/auth/admin/ping`

**Headers:**
```
Authorization: Bearer <token_jwt_de_usuario_admin>
```

**Parâmetros:** Nenhum

**Exemplo de Requisição (Usuário Admin):**

```bash
curl -X GET http://localhost:3000/auth/admin/ping \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Resposta 200 (Sucesso - User é Admin):**

```json
{
  "message": "Admin access granted",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "userRole": "admin",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Exemplo de Requisição (Usuário Attendant):**

```bash
curl -X GET http://localhost:3000/auth/admin/ping \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Resposta 403 (Proibido - User é Attendant):**

```json
{
  "error": "Access denied",
  "statusCode": 403,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 👥 Perfis de Acesso Disponíveis

O sistema implementa dois perfis de usuário com permissões distintas:

| Perfil | Valor BD | Permissões | Endpoints Acessíveis |
|--------|----------|-----------|----------------------|
| **Administrador** | `admin` | Acesso completo a todos os endpoints | `/auth/register`, `/auth/login`, `/auth/users/me`, `/auth/admin/ping` |
| **Atendente** | `attendant` | Acesso operacional com permissões restritas | `/auth/register`, `/auth/login`, `/auth/users/me` |

### Exemplos de Controle de Acesso

**✅ Usuário Admin consegue acessar:**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `GET /auth/users/me` - Ver seu perfil
- `GET /auth/admin/ping` - Acessar endpoint admin

**✅ Usuário Attendant consegue acessar:**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `GET /auth/users/me` - Ver seu perfil
- `GET /auth/admin/ping` - ❌ **Negado (erro 403)**

---

## 🧪 Testando a API

### Via Postman/Insomnia (Recomendado)

#### 1. Registrar Usuário
```
POST http://localhost:3000/auth/register
Headers: Content-Type: application/json
Body:
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "password": "senha123456"
}
```

#### 2. Login
```
POST http://localhost:3000/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "maria@example.com",
  "password": "senha123456"
}
```
**Copie o token retornado!**

#### 3. Acessar Rota Protegida
```
GET http://localhost:3000/auth/users/me
Headers: Authorization: Bearer <COLE_O_TOKEN_AQUI>
```

#### 4. Testar RBAC
```
GET http://localhost:3000/auth/admin/ping
Headers: Authorization: Bearer <COLE_O_TOKEN_AQUI>
```
**Esperado:** Erro 403 (se for attendant)

### Via cURL (Terminal)

```bash
# 1. Registrar
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","password":"teste123456"}'

# 2. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"teste123456"}'

# 3. Guardar token em variável
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 4. Acessar rota protegida
curl -X GET http://localhost:3000/auth/users/me \
  -H "Authorization: Bearer $TOKEN"

# 5. Testar RBAC
curl -X GET http://localhost:3000/auth/admin/ping \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔐 Recursos de Segurança Implementados

✅ **Criptografia de Senhas**
- Utilizando bcrypt com 10 salt rounds
- Senhas nunca são armazenadas em texto puro
- Senhas nunca são retornadas nas respostas

✅ **Autenticação JWT**
- Token JWT com payload contendo id, email e role
- Expiração configurável (padrão: 24 horas)
- Validação de assinatura e expiração

✅ **Variáveis Sensíveis Protegidas**
- Credenciais do banco em `.env`
- Chave secreta JWT em `.env`
- `.env` não é versionado no Git

✅ **Validação de Entrada**
- Email em formato válido
- Campos obrigatórios verificados
- Senha com comprimento mínimo

✅ **Tratamento de Erros**
- Erros de autenticação não especificam qual campo falhou
- Respostas estruturadas em JSON
- Status codes HTTP apropriados

✅ **CORS Ativado**
- Requisições de diferentes origens permitidas

---

## 📝 Fluxo de Desenvolvimento (Git)

### Branches Utilizadas

- `main` - Código em produção (estável)
- `develop` - Integração de funcionalidades
- `feat/setup-projeto` - Setup inicial
- `feat/auth` - Autenticação
- `feat/rbac` - Autorização baseada em perfis
- `docs/readme` - Documentação

### Commits Semânticos

O histórico de commits segue o padrão:

```
feat: cria estrutura inicial do projeto
feat: configura conexão com PostgreSQL via TypeORM
feat: cria entidade de usuário
feat: implementa cadastro de usuários
feat: implementa criptografia de senha com bcrypt
feat: implementa login com emissão de JWT
feat: implementa middleware de autenticação
feat: implementa middleware de autorização (RBAC)
feat: cria endpoints de verificação (users/me, admin/ping)
refactor: reorganiza camada de services
fix: corrige tratamento de token expirado
docs: atualiza README
```

---

## 🚀 Scripts Disponíveis

```bash
# Executar em desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Executar código compilado
npm start

# Executar migrations do banco
npm run migration:run

# Reverter última migration
npm run migration:revert

# Ver status das migrations
npm run migration:show
```

---

## ⚠️ Troubleshooting

### Erro: "Migration not found"
```bash
# Solução: Recriar banco e executar migrations
dropdb medclinic_db
createdb medclinic_db
npm run migration:run
```

### Erro: "Connection to database failed"
```bash
# Verificar credenciais em .env
# Confirmar que PostgreSQL está rodando
# Testar conexão manualmente
psql -U postgres -d medclinic_db -c "SELECT 1;"
```

### Erro: "JWT_SECRET is not defined"
```bash
# Adicionar JWT_SECRET ao arquivo .env
JWT_SECRET=sua_chave_secreta_aqui
```

---

## 📈 Próximas Etapas

As funcionalidades a seguir serão implementadas em etapas futuras do projeto:

1. **Etapa 2** - Gerenciamento de Especialidades
2. **Etapa 3** - Gerenciamento de Médicos
3. **Etapa 4** - Gerenciamento de Pacientes
4. **Etapa 5** - Gerenciamento de Consultas
5. **Etapa 6** - Relatórios e Analytics

Toda a base desenvolvida nesta etapa foi estruturada para receber essas funcionalidades sem necessidade de reestruturação.

---

## 📄 Licença

MIT

---

## 👨‍💻 Informações do Projeto

- **Versão:** 1.0.0
- **Status:** Etapa 1 - Completa
- **Data de Conclusão:** Janeiro de 2024
- **Linguagem:** TypeScript
- **Frameworks:** Node.js, Express.js, TypeORM

---

## 📞 Suporte

Para dúvidas sobre implementação:
- Consulte a seção de Troubleshooting
- Verifique os exemplos de requisição/resposta
- Analise o histórico de commits no Git

---

**Desenvolvido como projeto educacional para aprendizado de desenvolvimento backend com Node.js, TypeScript e Express.js**
