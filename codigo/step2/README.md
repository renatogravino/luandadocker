### Compilando a imagem localmente

>docker build -t imgteste .

### Criando o container com a imagem gerada

>docker run -p 3000:3000 --name containerteste imgteste

O container depois que for gerado ele é executado com start


### Apagar container e imagem

>docker container rm containerteste

>docker image rm imgteste

### usando o docker-compose

Inicia compilando   
>docker-compose up -d --build

Para os containers   
>docker-compose stop

Pode subir novamente sem precisar buildar pois já fez uma vez   
>docker-compose up -d

Apagar os containers e volumes   
>docker-compose down -v
