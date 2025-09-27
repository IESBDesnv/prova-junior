# Sistema de Gestão Educacional

Sistema web desenvolvido com Laravel 12, ReactJS, InertiaJS e TailwindCSS para gerenciamento de disciplinas escolares.

## Tecnologias Utilizadas

## LINK DE APRESENTAÇÃO NO YOUTUBE
- https://www.youtube.com/watch?v=LUm5wMoU280

### Backend
- **Laravel 12** - Framework PHP
- **MySQL** - Banco de dados
- **Docker** - Containerização

### Frontend
- **ReactJS** - Biblioteca JavaScript
- **InertiaJS** - SPA sem API
- **TailwindCSS** - Framework CSS

### Ambiente
- **Docker Compose** - Orquestração de containers
- **Laravel Sail** - Ambiente de desenvolvimento

## Funcionalidades

### Autenticação
- Login com e-mail e senha
- Registro de usuários
- Recuperação de senha
- Proteção de rotas

### Gestão de Disciplinas
- **Criar** disciplinas
- **Listar** disciplinas com paginação
- **Editar** disciplinas
- **Excluir** disciplinas
- **Busca** por nome e status
- **Filtros** avançados

### Campos Obrigatórios
- Nome da disciplina
- Código da disciplina (único)
- Carga horária
- Status (Ativa/Inativa)

### Funcionalidades Extras
- Dashboard com estatísticas
- Sistema de alunos
- Relacionamentos aluno-disciplina
- Interface responsiva
- Acessibilidade ARIA

## Instalação e Execução

### Pré-requisitos
- Docker
- Docker Compose



### 3. Inicie os containers
```bash
docker-compose up -d
```

### 4. Configure o banco de dados
```bash
# Execute as migrations
docker-compose exec laravel.test php artisan migrate

# Execute os seeders (opcional)
docker-compose exec laravel.test php artisan db:seed
```

### 5. Compile os assets
```bash
docker-compose exec laravel.test npm run build
```

### 6. Acesse a aplicação
```
http://localhost:8080
```

## Usuário Padrão

Para testar a aplicação, use as credenciais:
- **E-mail**: admin@escola.com
- **Senha**: 123456

## Estrutura do Projeto

```
├── app/
│   ├── Http/Controllers/     # Controllers
│   ├── Models/               # Models Eloquent
│   ├── Services/            # Services
│   └── Requests/            # Validações
├── database/
│   ├── migrations/          # Migrations
│   ├── seeders/            # Seeders
│   └── factories/          # Factories
├── resources/
│   ├── js/
│   │   ├── Components/     # Componentes React
│   │   ├── Layouts/        # Layouts
│   │   └── Pages/          # Páginas
│   └── css/                # Estilos
├── routes/
│   └── web.php             # Rotas
└── docker-compose.yml      # Configuração Docker
```

## Funcionalidades Implementadas

### Requisitos Obrigatórios
- [x] Tela de Login
- [x] Autenticação via e-mail e senha
- [x] Acesso restrito a usuários autenticados
- [x] CRUD de Disciplinas
- [x] Campos obrigatórios implementados
- [x] Validações no backend
- [x] Migrations para tabelas
- [x] Docker + Docker Compose
- [x] README.md com instruções

### Diferenciais Implementados
- [x] **Seeders**: Dados de exemplo
- [x] **Factories**: Geração de dados
- [x] **Dashboard**: Estatísticas em tempo real
- [x] **Interface Responsiva**: Mobile-first
- [x] **Acessibilidade**: ARIA attributes
- [x] **Validações**: Frontend e backend
- [x] **Paginação**: Listas otimizadas
- [x] **Busca**: Filtros avançados

## Comandos Úteis

### Desenvolvimento
```bash
# Executar em modo desenvolvimento
docker-compose exec laravel.test npm run dev

# Limpar cache
docker-compose exec laravel.test php artisan cache:clear

# Executar testes
docker-compose exec laravel.test php artisan test
```

### Produção
```bash
# Compilar assets para produção
docker-compose exec laravel.test npm run build

# Otimizar aplicação
docker-compose exec laravel.test php artisan optimize
```

## Banco de Dados

### Tabelas Principais
- **users** - Usuários do sistema
- **disciplinas** - Disciplinas escolares
- **alunos** - Alunos matriculados
- **matriculas** - Relacionamento aluno-disciplina

### Relacionamentos
- Usuário → Disciplinas (1:N)
- Aluno → Matrículas (1:N)
- Disciplina → Matrículas (1:N)
- Aluno ↔ Disciplina (N:N através de Matrículas)

## Interface

### Design System
- **Cores**: Paleta infantil com gradientes
- **Tipografia**: Fontes legíveis e acessíveis
- **Componentes**: Reutilizáveis e consistentes
- **Responsividade**: Mobile-first approach
- **Acessibilidade**: ARIA labels e navegação por teclado

## Deploy

### Produção
```bash
# Build para produção
docker-compose exec laravel.test npm run build

# Otimizar
docker-compose exec laravel.test php artisan optimize
```

## Licença

Este projeto foi desenvolvido como parte de um processo seletivo para vaga de Desenvolvedor Junior.

## Desenvolvedor

**Nome**: [Julien Helen Barbosa de Alcantara]
**Email**: [julie.hba@gmail.com]
**LinkedIn**: [https://www.linkedin.com/in/julien-de-alcantara-6319ab42/]

---

**Obrigado por avaliar meu projeto!**