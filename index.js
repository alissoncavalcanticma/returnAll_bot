require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

//Puxando variavéis de ambiente
const { API_KEY_NGROK, TELEGRAM_TOKEN } = process.env;

//Montando URL's
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`; // EX: https://api.telegram.org/bot9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA
const WEBHOOK_ENDPOINT = `/webhook/${TELEGRAM_TOKEN}` // EX: /webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA

//Função para setar o webhook
const setWebhookURL = async() => {
    //Request para obter o endpoint onde o túnel está aberto
    const resGetHost = await axios.get('https://api.ngrok.com/endpoints', {
        headers: {
            'Ngrok-Version': 2,
            'Authorization': `Bearer ${API_KEY_NGROK}`
        }
    })
    const ngrok_host = resGetHost.data.endpoints[0].public_url;
    console.log('ngrok_host :', ngrok_host);

    //Montando a URL do WebHook do NGROK
    const NGROK_WEBHOOK_URL = `${ngrok_host}${WEBHOOK_ENDPOINT}`; // EX: https://xxxxxxxxxx.ngrok.io/webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA

    //Request de set do webhook
    const resSetWebHook = await axios.get(`${TELEGRAM_API}/setWebhook?url=${NGROK_WEBHOOK_URL}`);
    // EX: https://api.telegram.org/bot9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA/setWebhook?url=https://xxxxxxxxxx.ngrok.io/webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA

    console.log("res :>> ", resSetWebHook.data);
};

// Endpoint local que recebe a requisição do webhook e dispara de volta o chat_id e text recebidos
app.post(WEBHOOK_ENDPOINT, async(req, res) => {
    const chat_id = req.body.message.chat.id;
    const text = req.body.message.text;

    let msg;

    if (text == 'oi') {
        msg = 'oi';
    } else {
        msg = 'Testando retorno...'
    }

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id,
        text: msg
    });

    return res.send();
})

// Start no server local e set do webhook no telegram
app.listen(process.env.PORT || 8080, async() => {
    console.log(`App running in: ${process.env.BASE}:${process.env.PORT}`);
    //Chamada do método para setar o webhook
    setWebhookURL();
})