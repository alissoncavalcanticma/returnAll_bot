# Registry of returnAll_bot project

###### Obs: Copy node project base of node_base_api
> 

####  Para este projeto:

  - Instalando as lib's:
    `npm i express nodemon body-parser axios dotenv`

####Instruções:

##### Instalar Client ngrok
 - Download
 - Chocolatey: (CMD) choco install ngrok
 - Docker (com token):  docker run -it -e NGROK_AUTHTOKEN=<token> ngrok/ngrok http 4000


##### Levantar tunel ngrok na porta 4000
*Com Docker não precisa, o túnel já é criado no start do container
 - `ngrok http 4000` -- Definir a mesma porta do server Node.js
 - Serviço pode ser acessado em: http://127.0.0.1:4040/