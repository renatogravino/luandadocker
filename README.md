# Docker

## O que é docker
```
É uma ferramenta para criação e administração de ambientes isolados.
Tem como objetivo gerar aplicações isolado da máquina original.
Pode criar diversos ambientes de forma rápida e modular.
É uma forma de encapsular todo um ambiente de desenvolvimento ou produção.

Definição oficial
Containers Docker empacotam componentes de software em um sistema de arquivos
completo, que contêm tudo necessário para a execução: código, runtime, ferramentas de
sistema - qualquer coisa que possa ser instalada em um servidor.
Isto garante que o software sempre irá executar da mesma forma, independente do seu
ambiente.
```

## O que é Imagem
```
Imagem é como um encapsulamento já com alguns papeis já definidos.
Seria como se fosse um CD de instalação de linux ou windows.
No repositorio de imagens do docker <a href="https://hub.docker.com/">https://hub.docker.com/</a>
temos diversas imagens para diversos tipos de trabalhos como 
nginx/apache para servir páginas bancos de dados como mysql, postgreSQL, 
mongoDB, redis linguagens de programação como Node, php, e muitos outros.
```

## O que é Container
```
Container é como se fosse uma maquina que está com uma imagem instalada para 
poder acessar e executar suas interações
```

## comandos docker

- docker image ls  
lista imagens

- docker image pull <imagem>  
baixa imagem

- docker image rm <imagem>  
apaga imagem

- docker container ls  
lista containers ativos

- docker container ls -a   
lista todos os containers

- docker ps
lista os containers (como processo)

- docker ps -a 
lista todos os containers (como processo)

- docker stop   
para os containers

- docker run --name primeiroteste -d ubuntu  
roda o container com nome primeiroteste usando a imagem ubuntu  (-d para rodar em segundo plano)

- docker exec -it primeiroteste /bin/bash
Executa dentro do container ativo o bash  (assim abrimos um terminal dentro do container)


docker run --name mongodb -p 27017:27017  -d mongo:4

docker exec -it mongodb mongo   
executa o mongo dentro do container mongodb

- .dockerignore
um arquivo que posso colocar o que quero que seja ignorado no docker


## Dockerfile
Um arquivo que posso fazer para ele criar as minhas imagens personalizadas
```
FROM node:14-alpine   (escolhi usar a imagem do node versão 14 com sistema operacional alpine)

WORKDIR /src  (Definindo o diretorio padrão /src dentro do container)

ADD package.json /src  (adiciona o arquivo package.json no diretorio src)

RUN npm i --silent  (instala os pacotes necessarios via npm )

ADD . /src

RUN npm run build

CMD npm start
```

detalhe o comando run é executado uma vez, ele cria o container e executa.
Pra executar outras vezes o container criado utilize exec

- docker build -t imagemapp  .  
vai criar uma imagem com o conteudo do dockerfile acima

- docker run --name app --link mongodb -e MONGO_URL=mongodb -e PORT=4000 -p 4000:4000 app
Executa o volume

criando um volume
docker volume create --name nodemodules

docker run --name app --link mongodb -e MONGO_URL=mongodb -e PORT=4000 -p 4000:4000 -v ./:/src -v nodemodules:/src/node_modules app npm run dev:watch

## docker compose

Criando o arquivo docker-compose.yml
```
version: '3'

services:
  mongodb:
    image: mongo:4
    ports:
      -27017:27017
     
  app:
    build: myDockerFile
    command: npm run dev:watch
    ports: 
      - 4000: 4000
    environment:
      MONGO_URL: mongodb
      PORT: 4000
    volumes:
      - ./codigo:/src
      - nodemodules:/src/node_modules
    links:
      - mongodb
    depends_on:
      - mongodb


volumes:
  nodemodules: {}

```
- docker-compose up --build -d   
vai rodar todos os containers (em background pelo -d)

- docker-compose stop   
para de rodar todos os containers

- docker-compose down -v   
apaga os containers e o volume (-v)


--- lembrar de falar do ctop