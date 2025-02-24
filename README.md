# Gym-OPS

O **Gym-OPS** é uma aplicação Desktop completa criada para facilitar o gerenciamento de academias para instrutores e administradores.

Este sistema permite a gestão de alunos, treinos, pagamentos e muito mais, tudo em uma interface simples e intuitiva. A aplicação foi projetada para facilitar o controle e a organização das atividades da academia.

## Tabela de conteudo
1. [Autores](#autores)  
2. [Funcionalidades](#funcionalidades)  
3. [Como rodar o projeto](#como-rodar-o-projeto)  
   - [Pré-requisitos](#pré-requisitos)  
   - [Instalando](#instalando) 
4. [Estrutura do projeto](#estrutura-do-projeto)
   - [Back-End](#back-end)
   - [Front-End](#front-end) 
5. [Licença](#licença)  

## Autores

Abaixo estão listados os desenvolvedores (em ordem alfabética) do projeto:  
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/guilhermepereiraborges">
        <img src="https://avatars.githubusercontent.com/guilhermepereiraborges" width="100px;" alt="Guilherme Pereira Borges"/>
        <br /><sub><b>Guilherme Pereira</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jeffaugg">
        <img src="https://avatars.githubusercontent.com/jeffaugg" width="100px;" alt="Jefferson Augusto de Melo Gomes"/>
        <br /><sub><b>Jefferson Augusto</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sheiely">
        <img src="https://avatars.githubusercontent.com/sheiely" width="100px;" alt="Sheiely Nascimento"/>
        <br /><sub><b>Sheiely Nascimento</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/WendelRodriguesz">
        <img src="https://avatars.githubusercontent.com/WendelRodriguesz" width="100px;" alt="Wendel Rodrigues"/>
        <br /><sub><b>Wendel Rodrigues</b></sub>
      </a>
    </td>
  </tr>
</table>

## Funcionalidades

- Cadastro e gerenciamento de alunos
- Cadastro de instrutores
- Atribuição de horarios
- Criação de planos
- Criação de treinos e exercicios
- Controle de pagamentos e mensalidades  
- Visualização de relatórios  
- Envio de mensagens

## Como Rodar o Projeto

Siga as instruções abaixo para rodar a aplicação localmente.

### Pré-requisitos

- Docker


### Instalando

1. Clone o repositório:
   ```bash
   git clone https://github.com/jeffaugg/gym-ops.git
   ```

1. Instalar as dependencias:
   ```bash
   cd Back
   npm install
   cd ..
   cd Front
   npm install
   ```

2. Rode o projeto:
   ```bash
   cd ..
   docker compose up
   ```

## Estrutura do projeto
### Back-End
```
src
├── modules
│   ├── alunos
│   │   ├── controller
│   │   │   └── AlunoController.ts
│   │   ├── dto
│   │   │   └── AlunoSchema.ts
│   │   ├── repository
│   │   │   └── AlunoRepository.ts
│   │   ├── service
│   │   │   └── AlunoService.ts
│   │   └── models
│   │       └── Aluno.ts
│   ├── avaliacoes
│   │   ├── controller
│   │   │   └── AvaliacaoController.ts
│   │   ├── dto
│   │   │   └── AvaliacaoSchema.ts
│   │   ├── repository
│   │   │   └── AvaliacoesRepository.ts
│   │   ├── service
│   │   │   └── AvaliacoesService.ts
│   │   └── models
│   │       └── Avaliacao.ts
│   ├── cargoHoraria
│   │   ├── controller
│   │   │   └── CargoHorariaController.ts
│   │   ├── dto
│   │   │   └── CargoHorariaSchema.ts
│   │   ├── repository
│   │   │   └── CargoHorariaRepository.ts
│   │   ├── service
│   │   │   └── CargoHorariaService.ts
│   │   └── models
│   │       └── CargoHoraria.ts
│   ├── exercicios
│   │   ├── controller
│   │   │   └── ExercicioController.ts
│   │   ├── dto
│   │   │   └── ExercicioSchema.ts
│   │   ├── repository
│   │   │   └── ExercicioRepository.ts
│   │   ├── service
│   │   │   └── ExercicioService.ts
│   │   └── models
│   │       └── Exercicio.ts
│   ├── mensagens
│   │   ├── controller
│   │   │   └── MensagemController.ts
│   │   ├── dto
│   │   │   └── MensagemSchema.ts
│   │   ├── repository
│   │   │   └── MensagemRepository.ts
│   │   ├── service
│   │   │   └── MensagemService.ts
│   │   └── models
│   │       └── Mensagem.ts
│   ├── pagamentos
│   │   ├── controller
│   │   │   └── PagamentoController.ts
│   │   ├── dto
│   │   │   └── PagamentoSchema.ts
│   │   ├── repository
│   │   │   └── PagamentoRepository.ts
│   │   ├── service
│   │   │   └── PagamentoService.ts
│   │   └── models
│   │       └── Pagamento.ts
│   ├── planos
│   │   ├── controller
│   │   │   └── PlanoController.ts
│   │   ├── dto
│   │   │   └── PlanoSchema.ts
│   │   ├── repository
│   │   │   └── PlanoRepository.ts
│   │   ├── service
│   │   │   └── PlanoService.ts
│   │   └── models
│   │       └── Plano.ts
│   ├── relatorios
│   │   ├── controller
│   │   │   └── RelatorioController.ts
│   │   ├── dto
│   │   │   └── RelatorioSchema.ts
│   │   ├── service
│   │   │   └── RelatorioService.ts
│   ├── treinos
│   │   ├── controller
│   │   │   └── TreinoController.ts
│   │   ├── dto
│   │   │   └── TreinoSchema.ts
│   │   ├── repository
│   │   │   └── TreinoRepository.ts
│   │   ├── service
│   │   │   └── TreinoService.ts
│   │   └── models
│   │       └── Treino.ts
│   ├── user
│   │   ├── controller
│   │   │   └── UserController.ts
│   │   ├── dto
│   │   │   └── UserSchema.ts
│   │   ├── repository
│   │   │   └── UserRepository.ts
│   │   ├── service
│   │   │   └── UserService.ts
│   │   └── models
│   │       └── User.ts
├── shared
│   ├── container
│   │   └── index.ts
│   ├── errors
│   │   └── AppError.ts
│   ├── helpers
│   │   └── PaginationHelper.ts
│   ├── infra
│   │   ├── http
│   │   │   ├── app.ts
│   │   │   ├── server.ts
│   │   │   └── routes
│   │   │       └── index.ts
│   │   ├── config
│   │   │   ├── auth.ts
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   └── swagger.json
│   │   ├── middleware
│   │   │   └── isAuth.ts
│   │   └── queues
│   │       └── mailQueue.ts
```
### Front-End
```
src
│   api.js
│   App.css
│   App.jsx
│   estrutura.txt
│   index.css
│   main.jsx
│   
├───assets
│   └───images
│           logo.png
│           logo2.png
│           
├───components
│   ├───Admin
│   │   ├───ExercisesForm
│   │   │       ExercisesForm.css
│   │   │       ExercisesForm.jsx
│   │   │       
│   │   ├───ExercisesTable
│   │   │       ExercisesTable.css
│   │   │       ExercisesTable.jsx
│   │   │       
│   │   ├───Home
│   │   │   ├───ChartComponent
│   │   │   │       BarChart.jsx
│   │   │   │       ChartComponent.jsx
│   │   │   │       
│   │   │   ├───Dashboard
│   │   │   │       Dashboard.css
│   │   │   │       Dashboard.jsx
│   │   │   │       DashboardCard.jsx
│   │   │   │       
│   │   │   └───TopFrequentUsers
│   │   │           TopFrequentUsers.css
│   │   │           TopFrequentUsers.jsx
│   │   │           
│   │   ├───InstructorsForm
│   │   │       InstructorsForm.css
│   │   │       InstructorsForm.jsx
│   │   │       
│   │   ├───InstructorsTable
│   │   │       InstructorsTable.css
│   │   │       InstructorsTable.jsx
│   │   │       
│   │   ├───LayoutPages
│   │   │       Layout.css
│   │   │       Layout.jsx
│   │   │       
│   │   ├───PayForm
│   │   │       PayForm.css
│   │   │       PayForm.jsx
│   │   │       
│   │   ├───PaymentsTable
│   │   │       PaymentsTable.css
│   │   │       PaymentsTable.jsx
│   │   │       
│   │   ├───PlansForm
│   │   │       PlansForm.css
│   │   │       PlansForm.jsx
│   │   │       
│   │   ├───PlansTable
│   │   │       PlansTable.css
│   │   │       PlansTable.jsx
│   │   │       
│   │   ├───SettingsForm
│   │   │       SettingsForm.css
│   │   │       SettingsForm.jsx
│   │   │       
│   │   ├───Sidebar
│   │   │       Sidebar.css
│   │   │       Sidebar.jsx
│   │   │       SidebarItem.jsx
│   │   │       
│   │   ├───StudentsForm
│   │   │       StudentsForm.css
│   │   │       StudentsForm.jsx
│   │   │       
│   │   ├───StudentsTable
│   │   │       StudentsTable.css
│   │   │       StudentsTable.jsx
│   │   │       
│   │   ├───WarningForm
│   │   │       WarningForm.css
│   │   │       WarningForm.jsx
│   │   │       
│   │   └───WarningTable
│   │           WarningTable.css
│   │           WarningTable.jsx
│   │           
│   ├───AssociateExerciseForm
│   │       AssociateExerciseForm.css
│   │       AssociateExerciseForm.jsx
│   │       
│   ├───Button
│   │       Button.css
│   │       Button.jsx
│   │       
│   ├───ButtonCancel
│   │       ButtonCancel.css
│   │       ButtonCancel.jsx
│   │       
│   ├───ButtonSend
│   │       ButtonSend.css
│   │       ButtonSend.jsx
│   │       
│   ├───FilterBar
│   │       FilterBar.css
│   │       FilterBar.jsx
│   │       
│   ├───Icon
│   │       Icon.css
│   │       Icon.jsx
│   │       
│   ├───InputField
│   │       InputField.css
│   │       InputField.jsx
│   │       
│   ├───InputFieldForm
│   │       InputFieldForm.css
│   │       InputFieldForm.jsx
│   │       
│   ├───Instructor
│   │   ├───Home
│   │   │   ├───Dashboard
│   │   │   │       Dashboard.css
│   │   │   │       Dashboard.jsx
│   │   │   │       DashboardCard.jsx
│   │   │   │       
│   │   │   └───TopFrequentUsers
│   │   │           TopFrequentUsers.css
│   │   │           TopFrequentUsers.jsx
│   │   │           
│   │   ├───LayoutPages
│   │   │       Layout.css
│   │   │       Layout.jsx
│   │   │       
│   │   ├───PhysicalAssessmentForm
│   │   │       PhysicalAssessmentForm.css
│   │   │       PhysicalAssessmentForm.jsx
│   │   │       
│   │   ├───PhysicalAssessmentTable
│   │   │       PhysicalAssessmentTable.css
│   │   │       PhysicalAssessmentTable.jsx
│   │   │       
│   │   ├───SettingsForm
│   │   │       SettingsForm.css
│   │   │       SettingsForm.jsx
│   │   │       
│   │   ├───Sidebar
│   │   │       Sidebar.css
│   │   │       Sidebar.jsx
│   │   │       SidebarItem.jsx
│   │   │       
│   │   ├───StudentDetails
│   │   │       StudentDetails.css
│   │   │       StudentDetails.jsx
│   │   │       
│   │   └───StudentsTable
│   │           StudentsTable.css
│   │           StudentsTable.jsx
│   │           
│   ├───LoginForm
│   │       LoginForm.css
│   │       LoginForm.jsx
│   │       
│   ├───Modal
│   │   ├───ConfirmationModal
│   │   │       ConfirmationModal.css
│   │   │       ConfirmationModal.jsx
│   │   └───Modal.css
│   │       Modal.jsx
│   │   
│   ├───Pagination
│   │       Pagination.css
│   │       Pagination.jsx
│   │       
│   ├───PhotoUpload
│   │       PhotoUpload.css
│   │       PhotoUpload.jsx
│   │       
│   ├───PresenceForm
│   │       PresenceForm.css
│   │       PresenceForm.jsx
│   │       
│   ├───PresenceTable
│   │       PresenceTable.css
│   │       PresenceTable.jsx
│   │       
│   ├───ProtectedRoute
│   │       ProtectedRoute.jsx
│   │       
│   ├───SignupForm
│   │       SignupForm.css
│   │       SignupForm.jsx
│   │       
│   ├───Topbar
│   │       Topbar.css
│   │       Topbar.jsx
│   │       
│   ├───TrainingsForm
│   │       TrainingsForm.css
│   │       TrainingsForm.jsx
│   │       
│   ├───TrainingsTable
│   │       TrainingsTable.css
│   │       TrainingsTable.jsx
│   │       
│   ├───UserProfile
│   │       UserProfile.css
│   │       UserProfile.jsx
│   │       
│   ├───WorkoutEditForm
│   │       WorkoutEditForm.css
│   │       WorkoutEditForm.jsx
│   │       
│   ├───WorkoutForm
│   │       WorkoutForm.css
│   │       WorkoutForm.jsx
│   │       
│   └───WorkoutTable
│           WorkoutTable.css
│           WorkoutTable.jsx
│           
└───pages
    ├───Admin
    │   ├───Exercises
    │   │       AdminExercises.css
    │   │       AdminExercises.jsx
    │   │       
    │   ├───Home
    │   │       AdminHome.css
    │   │       AdminHome.jsx
    │   │       
    │   ├───Instructors
    │   │       AdminInstructors.css
    │   │       AdminInstructors.jsx
    │   │       
    │   ├───Payments
    │   │       AdminPayments.css
    │   │       AdminPayments.jsx
    │   │       
    │   ├───Plans
    │   │       AdminPlans.css
    │   │       AdminPlans.jsx
    │   │       
    │   ├───Students
    │   │       Students.css
    │   │       Students.jsx
    │   │       
    │   └───Warnings
    │           AdminWarnings.css
    │           AdminWarnings.jsx
    │           
    ├───Instructor
    │   ├───Home
    │   │       InstructorHome.css
    │   │       InstructorHome.jsx
    │   │       
    │   ├───PhysicalAssessment
    │   │       PhysicalAssessment.css
    │   │       PhysicalAssessment.jsx
    │   │       
    │   ├───Students
    │   │       Students.css
    │   │       Students.jsx
    │   │       
    │   └───TrainingPage
    │           TrainingPage.css
    │           TrainingPage.jsx
    │           
    ├───LoginPage
    │       LoginPage.css
    │       LoginPage.jsx
    │       
    ├───Presence
    │       PresencePage.css
    │       PresencePage.jsx
    │       
    ├───Settings
    │       Settings.css
    │       Settings.jsx
    │       
    ├───SignupPage
    │       SignupPage.css
    │       SignupPage.jsx
    │       
    └───Workout
            Workout.css
            Workout.jsx
```

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.




