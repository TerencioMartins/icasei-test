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
2. Instale as dependências do projeto.
   Execute os seguintes comandos na raiz do projeto para instalar as dependências necessárias para o backend e o frontend.
   Para o backend (BFF):

```
cd bff
npm install
cd ..
```

Para o frontend (container):

```
cd container
npm install
cd ..
```

# Compilando o Projeto

Para compilar o projeto, você precisa compilar tanto o backend quanto o frontend. Siga estas etapas:

1. Compilar o backend:

```
cd bff
npm run build
cd ..
```

2. Compilar o frontend:

```
cd container
npm run build
cd ..
```

# Executando o Projeto

Após compilar o projeto, você pode executá-lo usando Docker Compose.

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
npm test
```

2. Testes do frontend:

```
cd container
npm test
```

Siga estas instruções para compilar, testar e executar o projeto. Se você encontrar algum problema, verifique se todos os requisitos estão instalados corretamente e se os comandos foram executados na raiz correta do projeto.

Este README fornece um guia passo a passo para configurar, compilar, testar e executar o projeto Teste FrontEnd iCasei 2024.
