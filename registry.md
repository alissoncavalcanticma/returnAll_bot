# Registry of returnAll_bot project

###### Obs: Copy node project base of node_base_api
> 

####  Para este projeto:

  - Instalando as lib's:
    `npm i express nodemon body-parser axios dotenv`

####Instruções:

##### Instalar Client ngrok
 - Download
 - Chocolatey: (CMD) `choco install ngrok`
 - Docker (com token)


##### Levantar tunel ngrok na porta 4000
 - Instalar o client local, baixando do site do ngrok 
 - Levantar o túnel com o client local usanto o comando`ngrok http 4000` -- Definir a mesma porta do server Node.js
 - Serviço pode ser acessado em: http://127.0.0.1:4040/

##### Levantar container com o ngrok na porta 4000

- docker run --name ngrok -it -e NGROK_AUTHTOKEN=<TOKEN> ngrok/ngrok:latest http host.docker.internal:4000

##### Sites utilizados para o projeto:

TELEGRAM:
 - https://web.telegram.org/

NGROK:
 - https://dashboard.ngrok.com/