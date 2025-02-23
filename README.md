# Gym-OPS

O **Gym-OPS** é uma aplicação Desktop completa criada para facilitar o gerenciamento de academias para instrutores e administradores.

Este sistema permite a gestão de alunos, treinos, pagamentos e muito mais, tudo em uma interface simples e intuitiva. A aplicação foi projetada para facilitar o controle e a organização das atividades da academia.

## Tabela de conteudo
1. [Autores](#autores)  
2. [Funcionalidades](#funcionalidades)  
3. [Como rodar o projeto](#como-rodar-o-projeto)  
   - [Pré-requisitos](#pré-requisitos)  
   - [Instalando](#instalando)  
4. [Licença](#licença)  

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

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.




