# Teste FrontEnd iCasei 2024

Este documento fornece instruções detalhadas sobre como configurar, compilar, testar e executar o projeto.

## Requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados em seu sistema:

- Node.js
- Docker
- Docker Compose

## Configuração do Projeto

Siga estas etapas para configurar o projeto em sua máquina local.

1. Clone o repositório:
   ```bash
   git clone https://github.com/TerencioMartins/icasei-test.git
   cd icasei-test
   ```

# Executando o Projeto

Após clonar o projeto, você pode executá-lo usando Docker Compose.
Ps. Lembre-se de estar com o docker aberto na sua máquina.

1. Na raiz do projeto, execute o seguinte comando para iniciar todos os serviços definidos no docker-compose.yml:

```
docker-compose up --build
```

2. Aguarde até que todos os serviços estejam em execução. Você pode acessar o frontend navegando para http://localhost:8080 em seu navegador.

# Testando o Projeto

Para executar os testes, você precisa executar os testes tanto para o backend quanto para o frontend.

1. Testes do backend:

```
cd bff
npm install
npm test
cd ..
```

2. Testes do frontend:

```
cd container
npm install
npm test
cd ..
```

Siga estas instruções para compilar, testar e executar o projeto. Se você encontrar algum problema, verifique se todos os requisitos estão instalados corretamente e se os comandos foram executados na raiz correta do projeto.

Este README fornece um guia passo a passo para configurar, compilar, testar e executar o projeto Teste FrontEnd iCasei 2024.
