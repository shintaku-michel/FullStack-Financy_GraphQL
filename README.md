# ROCKETSEAT - FullStack-Financy_GraphQL

### Funcionalidades do Projeto
Este projeto implementa um sistema completo de autenticação, gerenciamento de transações e categorias, garantindo que cada usuário tenha acesso apenas aos seus próprios dados.

### Autenticação de Usuário
- [x] O usuário pode criar uma conta
- [x] O usuário pode realizar login

### Controle de Acesso
- [x] O usuário pode visualizar e gerenciar apenas as transações e categorias criadas por ele

### Transações
- [x] Criar uma transação
- [x] Editar uma transação
- [x] Deletar uma transação
- [x] Listar todas as transações do usuário

### Categorias
- [x] Criar uma categoria
- [x] Editar uma categoria
- [x] Deletar uma categoria
- [x] Listar todas as categorias do usuário

---

### Estrutura do Projeto

```
/
├── backend/    # API GraphQL (Node.js, TypeGraphQL, Prisma, SQLite)
└── frontend/   # Interface web (React, Vite, Apollo Client, Tailwind CSS)
```

### Como rodar

**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Atualizações
- [x] Implementação RefreshToken
- [x] Troca de imagem do usuário
- [x] DarkMode