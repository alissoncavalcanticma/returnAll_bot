require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

//puxando variavéis de ambiente
const { API_KEY_NGROK, TELEGRAM_TOKEN } = process.env;

// consultar host NGROK
/* const getHost = async() => {
    const response = await axios.get('https://api.ngrok.com/endpoints', {
        headers: {
            'Ngrok-Version': 2,
            'Authorization': 'Bearer 2VWbCC7zP80yrs2OeA52a8FGt6C_4MrX9xGnYmvRnG1aiyVBQ'
        }
    });
    /* if (response) {
        //dados = await response.data.endpoints[0].hostport;
        //console.log(dados)
    } */


//console.log(response.data.endpoints[0].id)
//const json = await response.json();

//return json;
/* .then(res => {
            console.log("Retorno get endpoints: ", res.data);
            //return res.data;
        }); 
} */

/* async function getHostNgrok() {
    return axios.get('https://api.ngrok.com/endpoints', {
        headers: {
            'Ngrok-Version': 2,
            'Authorization': 'Bearer 2VWbCC7zP80yrs2OeA52a8FGt6C_4MrX9xGnYmvRnG1aiyVBQ'
        }
    }).then(response => {
        dados = response.data;
        console.log("Dados internos: ", dados);
        return dados;
    }).catch(e => {
        console.error("Error: ", e);
    });
} */

/* ret = async function getHostNgrok() {
        return axios.get('https://api.ngrok.com/endpoints', {
            headers: {
                'Ngrok-Version': 2,
                'Authorization': 'Bearer 2VWbCC7zP80yrs2OeA52a8FGt6C_4MrX9xGnYmvRnG1aiyVBQ'
            }
        }).then(response => {

            //console.log("response.data interno: ", response.data);
            return public_url = response.data.endpoints[0].public_url;
        }).catch(e => {
            console.error("Error: ", e);
        });
    } */
//dados = ret().then(ret);
//getHostNgrok().then(dados);

/* async function getHostNgrok() {
    try {
        const response = await axios.get('https://api.ngrok.com/endpoints', {
            headers: {
                'Ngrok-Version': 2,
                'Authorization': 'Bearer 2VWbCC7zP80yrs2OeA52a8FGt6C_4MrX9xGnYmvRnG1aiyVBQ'
            }
        })
        const dadosRecebidos = response.data;
        minhaVariavel = dadosRecebidos;
    } catch (e) {
        console.error('Erro na chamada Axios:', error);
    }
} */
/* axios.get('https://api.ngrok.com/endpoints', {
    headers: {
        'Ngrok-Version': 2,
        'Authorization': 'Bearer 2VWbCC7zP80yrs2OeA52a8FGt6C_4MrX9xGnYmvRnG1aiyVBQ'
    }
}).then(response => {
    const dadosRecebidos = response.data.endpoints[0].public_url;
    console.log("dados recebidos interno: ", dadosRecebidos);

    minhaVariavel = dadosRecebidos;
    //return public_url = response.data.endpoints[0].public_url;
}).catch(e => {
    console.error("Error: ", e);
}); */

//getHostNgrok().then(() => { console.log(minhaVariavel)});

//dados = ret().then(public_url => { return public_url });
//console.log(ret().then(public_url => { console.log(public_url) }));
//console.log("Dados externos: ", ret().then(dados));
//montando as URL's do telegram e do webhook
/* const WEBHOOK_ENDPOINT = `/webhook/${TELEGRAM_TOKEN}` // EX: /webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA
const NGROK_WEBHOOK_URL = `${HOST_NGROK}${WEBHOOK_ENDPOINT}`; // EX: https://xxxxxxxxxx.ngrok.io/webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`; // EX: https://api.telegram.org/bot9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA */

//criando função de set da URL do webhook no telegram
/* const setWebhookURL = async() => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${NGROK_WEBHOOK_URL}`);
    // EX: https://api.telegram.org/bot9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA/setWebhook?url=https://xxxxxxxxxx.ngrok.io/webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA

    console.log("res :>> ", res.data);
}; */
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`; // EX: https://api.telegram.org/bot9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA
const WEBHOOK_ENDPOINT = `/webhook/${TELEGRAM_TOKEN}` // EX: /webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA


const setWebhookURL = async() => {
    const resGetHost = await axios.get('https://api.ngrok.com/endpoints', {
        headers: {
            'Ngrok-Version': 2,
            'Authorization': `Bearer ${API_KEY_NGROK}`
        }
    })
    const ngrok_host = resGetHost.data.endpoints[0].public_url;
    console.log('ngrok_host :', ngrok_host);

    const NGROK_WEBHOOK_URL = `${ngrok_host}${WEBHOOK_ENDPOINT}`; // EX: https://xxxxxxxxxx.ngrok.io/webhook/9999999999:AAAAAAAAAAAAAAAAAAAAAAAAAAAA_AA

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
    setWebhookURL();
    //getHostNgrok().then(dados);
})